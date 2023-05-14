interface ItemCharacteristicDto {
  dp_id: number;
  dp_itemId: string;
  dp_characteristicId: number;
  dp_value: string;
}

interface ItemGaleryDto {
  dp_id: number;
  dp_itemId: string;
  dp_photoUrl: string;
}

interface ItemDto {
  dp_id: string;
  dp_name: string;
  dp_model: string;
  dp_cost: number;
  dp_photoUrl: string;
  dp_itemCategoryId: number;
  dp_seoKeywords: string;
  dp_seoDescription: string;
  dp_itemCharecteristics: ItemCharacteristicDto[];
  dp_itemGalery: ItemGaleryDto[];
}

export default ItemDto;
