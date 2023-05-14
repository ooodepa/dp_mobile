import ArticleDto from './dto/article.dto';
import FetchBackend from '../../../FetchBackend';
import FilterArticleDto from './dto/filter-article.dto';
import HttpException from '../../../exceptions/HttpException';
import ObjectToQueryString from './../../../../ObjectToQueryString';

export default class FetchArticles {
  static async getAll(filter: FilterArticleDto = {}) {
    const QUERY = ObjectToQueryString(filter);
    const result = await FetchBackend('none', 'GET', `articles?${QUERY}`);
    const response = result.response;

    if (response.status === 200) {
      const json: ArticleDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async get(uuid: string) {
    const result = await FetchBackend('none', 'GET', `articles/${uuid}`);
    const response = result.response;

    if (response.status === 200) {
      const json: ArticleDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getByUrl(url: string) {
    const result = await FetchBackend(
      'none',
      'GET',
      `articles/filter-one/url/${url}`,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: ArticleDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
