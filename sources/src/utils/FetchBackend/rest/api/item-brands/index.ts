import ItemBrandsDto from './dto/item-brand.dto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchItemBrands {
  static async getAll() {
    const result = await FetchBackend('none', 'GET', 'item-brands');
    const response = result.response;

    if (response.status === 200) {
      const json: ItemBrandsDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
