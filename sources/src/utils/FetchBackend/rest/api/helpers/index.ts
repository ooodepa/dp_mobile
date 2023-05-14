import HelperDto from './dto/helper.dto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchHelpers {
  static async getAll() {
    const result = await FetchBackend('none', 'GET', 'helpers');
    const response = result.response;

    if (response.status === 200) {
      const json: HelperDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
