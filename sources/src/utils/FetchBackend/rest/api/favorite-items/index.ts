import FetchBackend from '../../../FetchBackend';
import FavoriteItemDto from './dto/FavoriteItemDto';
import HttpException from '../../../exceptions/HttpException';

export default class FetchFavoriteItems {
  static async getAll(): Promise<FavoriteItemDto[]> {
    const URI = 'favorite-items';
    const response = await FetchBackend.get('access', URI);

    if (response.status === 200) {
      const json: FavoriteItemDto[] = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }

  static async like(itemId: string) {
    const URI = `favorite-items/${itemId}`;
    const response = await FetchBackend.post('access', URI);

    if (response.status === 201) {
      return true;
    }

    throw new HttpException('POST', response);
  }

  static async unLike(itemId: string) {
    const URI = `favorite-items/${itemId}`;
    const response = await FetchBackend.delete('access', URI);

    if (response.status === 200) {
      return true;
    }

    throw new HttpException('DELETE', response);
  }
}
