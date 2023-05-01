import ItemShortDto from '../../FetchBackend/rest/api/items/dto/ItemShortDto';

interface LikeUnlikeItemDto extends ItemShortDto {
  isLike: boolean;
}

export default LikeUnlikeItemDto;
