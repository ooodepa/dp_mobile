import {DOMParser} from 'xmldom';

import NotFoundException from '../FetchBackend/exceptions/NotFoundException';
import HttpException from '../FetchBackend/exceptions/HttpException';

/**
 * ```
 * ROWSET > ROW > VUNP -------> dp_unp
 * ROWSET > ROW > VNAIMP -----> dp_orgName
 * ROWSET > ROW > VNAIMK -----> dp_shortOrgName
 * ROWSET > ROW > VPADRES ----> dp_address
 * ROWSET > ROW > DREG -------> dp_registrationDate
 * ROWSET > ROW > NMNS -------> dp_inspectionCode
 * ROWSET > ROW > VMNS -------> dp_nameInspection
 * ROWSET > ROW > CKODSOST ---> dp_stateCode
 * ROWSET > ROW > VKODS ------> dp_state
 * ROWSET > ROW > DLIKV ------> dp_stateChangeDate
 * ```
 */
interface UnpData {
  unp: string;
  name: string;
  shortName: string;
  address: string;
  registDate: string;
  inspectionCode: string;
  inspectionName: string;
  stateCode: string;
  stateName: string;
  stateDate: string;
}

export default class FetchUnp {
  static async getByUnp(unp: string) {
    const URL = `https://www.portal.nalog.gov.by/grp/getData?unp=${unp}`;
    const response = await fetch(URL);
    // eslint-disable-next-line no-console
    console.log(`GET ${response.url} ${response.status}`);

    if (response.status === 200) {
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

      const ROWSET = xmlDoc.getElementsByTagName('ROWSET')[0] ?? null;
      const ROW = ROWSET?.getElementsByTagName('ROW')[0] ?? null;

      const data: UnpData = {
        unp: ROW?.getElementsByTagName('VUNP')[0]?.textContent ?? '',
        name: ROW?.getElementsByTagName('VNAIMP')[0]?.textContent ?? '',
        shortName: ROW?.getElementsByTagName('VNAIMK')[0]?.textContent ?? '',
        address: ROW?.getElementsByTagName('VPADRES')[0]?.textContent ?? '',
        registDate: ROW?.getElementsByTagName('DREG')[0]?.textContent ?? '',
        inspectionCode: ROW?.getElementsByTagName('NMNS')[0]?.textContent ?? '',
        inspectionName: ROW?.getElementsByTagName('VMNS')[0]?.textContent ?? '',
        stateCode: ROW?.getElementsByTagName('CKODSOST')[0]?.textContent ?? '',
        stateName: ROW?.getElementsByTagName('VKODS')[0]?.textContent ?? '',
        stateDate: ROW?.getElementsByTagName('DLIKV')[0]?.textContent ?? '',
      };

      return data;
    }

    if (response.status === 404) {
      throw new NotFoundException();
    }

    throw new HttpException('GET', response);
  }
}
