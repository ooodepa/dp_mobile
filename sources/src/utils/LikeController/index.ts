import LikeUnlikeItemDto from './dto/LikeUnlikeItemDto';
import ItemShortDto from '../FetchBackend/rest/api/items/dto/ItemShortDto';
import FavoriteItemDto from '../FetchBackend/rest/api/favorite-items/dto/FavoriteItemDto';

class LikeController {
  static like(likeItems: LikeUnlikeItemDto[], itemId: string) {
    for (let i = 0; i < likeItems.length; ++i) {
      if (likeItems[i].dp_id === itemId) {
        likeItems[i].isLike = true;
        break;
      }
    }
    return likeItems;
  }

  static unLike(likeItems: LikeUnlikeItemDto[], itemId: string) {
    for (let i = 0; i < likeItems.length; ++i) {
      if (likeItems[i].dp_id === itemId) {
        likeItems[i].isLike = false;
        break;
      }
    }
    return likeItems;
  }

  static getProducts(items: ItemShortDto[], likes: FavoriteItemDto[]) {
    const likeItems: LikeUnlikeItemDto[] = [];

    items.forEach(element => {
      let isLike = false;
      const itemId = element.dp_id;

      for (let i = 0; i < likes.length; ++i) {
        if (likes[i].dp_itemId === itemId) {
          isLike = true;
          break;
        }
      }

      likeItems.push({...element, isLike});
    });

    return likeItems;
  }
}

export default LikeController;
