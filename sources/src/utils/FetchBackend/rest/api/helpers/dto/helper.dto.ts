interface LstHelperCommunicationTypeEntity {
  dp_id: number;
  dp_helperId: string;
  dp_contactTypeId: number;
  dp_value: string;
  dp_isHidden: boolean;
}

interface HelperDto {
  dp_id: string;
  dp_sortingIndex: number;
  dp_name: string;
  dp_text: string;
  dp_isHidden: boolean;
  dp_helperContactTypes: LstHelperCommunicationTypeEntity[];
}

export default HelperDto;
