interface OrderItem {
  dp_itemId: string;
  dp_count: number;
}

interface CreateOrderDto {
  dp_orderItems: OrderItem[];
}

export default CreateOrderDto;
