import GetOrderDto from './get-order.dto';

interface OrderItemDto {
  dp_id: number;
  dp_orderId: string;
  dp_itemId: string;
  dp_count: number;
  dp_cost: number;
}

interface GetOrderWithIdDto extends GetOrderDto {
  dp_orderItems: OrderItemDto[];
}

export default GetOrderWithIdDto;
