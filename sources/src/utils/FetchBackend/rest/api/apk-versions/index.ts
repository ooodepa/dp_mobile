import ApkVersionDto from './dto/ApkVersionDto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchApkVersions {
  static async getLast() {
    const URI = 'apk-versions/last';

    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ApkVersionDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
