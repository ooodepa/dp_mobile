import ApkVersionDto from './dto/apk-version.dto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchApkVersions {
  static async getLast() {
    const result = await FetchBackend('none', 'GET', 'apk-versions/last');
    const response = result.response;

    if (response.status === 200) {
      const json: ApkVersionDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
