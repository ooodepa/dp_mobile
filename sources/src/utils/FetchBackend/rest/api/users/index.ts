import {Alert} from 'react-native';

import GetUserDto from './dto/GetUserDto';
import CreateUserDto from './dto/CreateUserDto';
import FetchBackend from '../../../FetchBackend';
import HttpResponseDto from '../../../HttpResponseDto';
import ForgetPasswordDto from './dto/ForgetPasswordDto';
import HttpException from '../../../exceptions/HttpException';
import CreateUserResponseDto from './dto/CreateUserResponseDto';

export default class FetchUsers {
  static async forgetPassword(dto: ForgetPasswordDto) {
    const URI = 'users/forget-password';

    const response = await FetchBackend.post('none', URI, dto);

    if (response.status === 200) {
      return true;
    }

    throw new HttpException('POST', response);
  }

  static async create(dto: CreateUserDto) {
    const URI = 'users';

    const response = await FetchBackend.post('none', URI, dto);

    if (response.status === 201) {
      const json: CreateUserResponseDto = await response.json();

      const message = 'Подтвердите вашу регистрацию по электронной почте';
      Alert.alert('Регистрация', message);

      return json;
    }

    const json: HttpResponseDto = await response.json();
    const message = ` Код: ${response.status} \n ${json.message}`;
    Alert.alert('Регистрация', message);

    throw new HttpException('POST', response);
  }

  static async findOne() {
    const response = await FetchBackend.get('access', 'users');

    if (response.status === 200) {
      const json: GetUserDto = await response.json();
      return json;
    }

    throw new HttpException('GET', response);
  }
}
