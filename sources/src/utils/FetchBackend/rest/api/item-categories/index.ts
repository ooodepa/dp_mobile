import FetchBackend from '../../../FetchBackend';
import ItemCategoryDto from './dto/item-category.dto';
import HttpException from '../../../exceptions/HttpException';
import ObjectToQueryString from '../../../../ObjectToQueryString';
import FilterItemCategoryDto from './dto/filter-item-category.dto';

export default class FetchItemCategories {
  static async getAll(filter: FilterItemCategoryDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const result = await FetchBackend(
      'none',
      'GET',
      `item-categories?${QUERY}`,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: ItemCategoryDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
