interface OrderItemDto {
  dp_id: number;
  dp_orderId: string;
  dp_itemId: string;
  dp_count: number;
  dp_cost: number;
}

interface GetOrderDto {
  dp_id: string;
  dp_date: string;
  dp_userId: number;
  dp_isCancelled: boolean;
  dp_isCompleted: boolean;
  dp_orderItems: OrderItemDto[];
}

export default GetOrderDto;
