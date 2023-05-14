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
}
