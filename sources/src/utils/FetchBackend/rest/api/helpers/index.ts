import HelperDto from './dto/HelperDto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchHelpers {
  static async getAll() {
    const URI = 'helpers';

    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: HelperDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
