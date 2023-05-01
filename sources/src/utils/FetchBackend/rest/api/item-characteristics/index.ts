import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';
import ItemCharacteristicDto from './dto/ItemCharacteristicDto';

export default class FetchItemCharacteristics {
  static async getAll() {
    const URI = 'item-characteristics';

    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ItemCharacteristicDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
