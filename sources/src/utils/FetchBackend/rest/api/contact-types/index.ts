import FetchBackend from '../../../FetchBackend';
import ContactTypesDto from './dto/contact-types.dto';
import HttpException from '../../../exceptions/HttpException';

export default class FetchCommunicationTypes {
  static async getAll() {
    const result = await FetchBackend('none', 'GET', 'contact-types');
    const response = result.response;

    if (response.status === 200) {
      const json: ContactTypesDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
