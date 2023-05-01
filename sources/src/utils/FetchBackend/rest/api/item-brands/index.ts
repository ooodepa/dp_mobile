import ItemBrandsDto from './dto/ItemBrandDto';
import FetchBackend from '../../../FetchBackend';
import HttpException from '../../../exceptions/HttpException';

export default class FetchItemBrands {
  static async getAll() {
    const URI = 'item-brands';
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ItemBrandsDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
