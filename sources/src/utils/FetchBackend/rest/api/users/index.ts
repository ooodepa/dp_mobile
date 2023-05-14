import {Alert} from 'react-native';

import GetUserDto from './dto/get-user.dto';
import CreateUserDto from './dto/create-user.dto';
import FetchBackend from '../../../FetchBackend';
import ForgetPasswordDto from './dto/forget-password.dto';
import HttpException from '../../../exceptions/HttpException';
import CreateUserResponseDto from './dto/create-user-response.dto';

export default class FetchUsers {
  static async forgetPassword(dto: ForgetPasswordDto) {
    const result = await FetchBackend(
      'none',
      'POST',
      'users/forget-password',
      dto,
    );
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async create(dto: CreateUserDto) {
    const result = await FetchBackend('none', 'POST', 'users', dto);
    const response = result.response;

    if (response.status === 201) {
      const json: CreateUserResponseDto = await response.json();
      Alert.alert(
        'Регистрация',
        'Подтвердите вашу регистрацию по электронной почте',
      );
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async findOne() {
    const result = await FetchBackend('access', 'GET', 'users');
    const response = result.response;

    if (response.status === 200) {
      const json: GetUserDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }
}
