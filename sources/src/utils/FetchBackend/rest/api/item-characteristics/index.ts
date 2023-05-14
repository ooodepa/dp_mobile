import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';
import ItemCharacteristicDto from './dto/item-characteristic.dto';

export default class FetchItemCharacteristics {
  static async getAll() {
    const result = await FetchBackend('none', 'GET', 'item-characteristics');
    const response = result.response;

    if (response.status === 200) {
      const json: ItemCharacteristicDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
