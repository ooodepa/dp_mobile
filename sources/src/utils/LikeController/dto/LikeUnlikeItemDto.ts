import ItemShortDto from '../../FetchBackend/rest/api/items/dto/item-short.dto';

interface LikeUnlikeItemDto extends ItemShortDto {
  isLike: boolean;
}

export default LikeUnlikeItemDto;
