import GetOrderDto from './dto/get-order.dto';
import SendCheckDto from './dto/send-check.dto';
import FetchBackend from '../../../FetchBackend';
import CreateOrderDto from './dto/create-order.dto';
import GetOrderWithIdDto from './dto/get-order-with-id.dto';
import HttpException from '../../../exceptions/HttpException';

export default class FetchOrders {
  static async create(dto: CreateOrderDto) {
    const result = await FetchBackend('access', 'POST', 'orders', dto);
    const response = result.response;

    if (response.status === 201) {
      const json: GetOrderDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getAll() {
    const result = await FetchBackend('access', 'GET', 'orders');
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderWithIdDto[] = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async getById(id: string) {
    const result = await FetchBackend('access', 'GET', `orders/${id}`);
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderWithIdDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async sendCheck(id: string, dto: SendCheckDto) {
    const result = await FetchBackend(
      'access',
      'POST',
      `orders/${id}/send-check`,
      dto,
    );
    const response = result.response;

    if (response.status === 200) {
      const json: GetOrderDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
