import ArticleDto from './dto/ArticleDto';
import FetchBackend from '../../../FetchBackend';
import FilterArticleDto from './dto/FilterArticleDto';
import HttpException from '../../../exceptions/HttpException';
import ObjectToQueryString from './../../../../ObjectToQueryString';

export default class FetchArticles {
  static async getAll(filter: FilterArticleDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const URI = `articles?${QUERY}`;
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ArticleDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async get(uuid: string) {
    const URI = `articles/${uuid}`;
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ArticleDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async getByUrl(url: string) {
    const URI = `articles/url/${url}`;
    const response = await FetchBackend.get('none', URI);

    if (response.status === 200) {
      const json: ArticleDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
