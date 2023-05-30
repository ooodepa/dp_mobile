interface GetOrderDto {
  dp_id: string;
  dp_date: string;
  dp_userId: number;
  dp_canceledByClient: string | null;
  dp_canceledByManager: string | null;
  dp_sentedByManager: string | null;
  dp_receivedByClient: string | null;
}

export default GetOrderDto;
