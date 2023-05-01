import FetchBackend from '../../../FetchBackend';
import ItemCategoryDto from './dto/ItemCategoryDto';
import HttpException from '../../../exceptions/HttpException';
import FilterItemCategoryDto from './dto/FilterItemCategoryDto';
import ObjectToQueryString from '../../../../ObjectToQueryString';

export default class FetchItemCategories {
  static async getAll(filter: FilterItemCategoryDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const URI = `item-categories?${QUERY}`;

    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ItemCategoryDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
