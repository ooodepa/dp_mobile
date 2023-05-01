import ContactTypesDto from './dto/ContactTypesDto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchCommunicationTypes {
  static async getAll() {
    const URI = 'contact-types';
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ContactTypesDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
