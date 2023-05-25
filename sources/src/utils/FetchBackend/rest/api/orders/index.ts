import GetOrderDto from './dto/get-order.dto';
import FetchBackend from '../../../FetchBackend';
import CreateOrderDto from './dto/create-order.dto';
import HttpException from '../../../exceptions/HttpException';

export default class FetchOrders {
  static async create(dto: CreateOrderDto) {
    const result = await FetchBackend('access', 'POST', 'orders', dto);
    const response = result.response;

    if (response.status === 201) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async getAll() {
    const result = await FetchBackend('access', 'GET', 'orders');
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getById(id: string) {
    const result = await FetchBackend('access', 'GET', `orders/${id}`);
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
