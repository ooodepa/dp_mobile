import FetchBackend from '../../../FetchBackend';
import FavoriteItemDto from './dto/favorite-item.dto';
import HttpException from '../../../exceptions/HttpException';

export default class FetchFavoriteItems {
  static async getAll(): Promise<FavoriteItemDto[]> {
    const result = await FetchBackend('access', 'GET', 'favorite-items');
    const response = result.response;

    if (response.status === 200) {
      const json: FavoriteItemDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async like(itemId: string) {
    const result = await FetchBackend(
      'access',
      'POST',
      `favorite-items/${itemId}`,
    );
    const response = result.response;

    if (response.status === 201) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async unLike(itemId: string) {
    const result = await FetchBackend(
      'access',
      'DELETE',
      `favorite-items/${itemId}`,
    );
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }
}
