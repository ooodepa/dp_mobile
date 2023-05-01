import ItemDto from './dto/ItemDto';
import ItemShortDto from './dto/ItemShortDto';
import FilterItemDto from './dto/FilterItemDto';
import FetchBackend from '../../../FetchBackend';
import FindItemIdsDto from './dto/FindItemIdsDto';
import FindItemModelsDto from './dto/FindItemModelsDto';
import HttpException from '../../../exceptions/HttpException';
import ObjectToQueryString from '../../../../ObjectToQueryString';

export default class FetchItems {
  static async getAll(filter: FilterItemDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const URI = `items?${QUERY}`;
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ItemDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async get(uuid: string) {
    const URI = `items/${uuid}`;
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ItemDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getByModels(models: string[]) {
    const body: FindItemModelsDto = {models};
    const URI = 'items/filter/models';
    const response = await FetchBackend.post('none', URI, body);

    if (response.status === 201) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getByIds(ids: string[]) {
    const body: FindItemIdsDto = {ids};
    const URI = 'items/filter/ids';
    const response = await FetchBackend.post('none', URI, body);

    if (response.status === 201) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async search(search: string) {
    const body = {search};
    const URI = 'items/search';
    const response = await FetchBackend.post('none', URI, body);

    if (response.status === 201) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException('POST', response);
  }

  static async searchAll(search: string) {
    const body = {search};
    const URI = 'items/search-all';
    const response = await FetchBackend.post('none', URI, body);

    if (response.status === 201) {
      const json: ItemShortDto[] = await response.json();
      return json;
    }

    throw new HttpException('POST', response);
  }
}
