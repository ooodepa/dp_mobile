import ItemDto from './dto/item.dto';
import ItemShortDto from './dto/item-short.dto';
import FilterItemDto from './dto/filter-item.dto';
import FetchBackend from '../../../FetchBackend';
import FindItemIdsDto from './dto/find-item-ids.dto';
import FindItemModelsDto from './dto/find-item-models.dto';
import HttpException from '../../../exceptions/HttpException';
import ObjectToQueryString from '../../../../ObjectToQueryString';

export default class FetchItems {
  static async getAll(filter: FilterItemDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const result = await FetchBackend('none', 'GET', `items?${QUERY}`);
    const response = result.response;

    if (response.status === 200) {
      const json: ItemDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async get(uuid: string) {
    const result = await FetchBackend('none', 'GET', `items/${uuid}`);
    const response = result.response;

    if (response.status === 200) {
      const json: ItemDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getByModels(models: string[]) {
    const body: FindItemModelsDto = {models};
    const result = await FetchBackend(
      'none',
      'POST',
      'items/filter/models',
      body,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getByIds(ids: string[]) {
    const body: FindItemIdsDto = {ids};
    const result = await FetchBackend('none', 'POST', 'items/filter/ids', body);
    const response = result.response;

    if (response.status === 200) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async search(search: string) {
    const body = {search};
    const result = await FetchBackend('none', 'POST', 'items/search', body);
    const response = result.response;

    if (response.status === 200) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async searchAll(search: string) {
    const body = {search};
    const result = await FetchBackend('none', 'POST', 'items/search-all', body);
    const response = result.response;

    if (response.status === 200) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
