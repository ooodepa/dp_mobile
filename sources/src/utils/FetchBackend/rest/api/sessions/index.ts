import {Alert} from 'react-native';

import GetSessionsDto from './dto/GetSessionDto';
import FetchBackend from '../../../FetchBackend';
import CreateSessionDto from './dto/CreateSessionDto';
import HttpResponseDto from '../../../HttpResponseDto';
import HttpException from '../../../exceptions/HttpException';
import CreateSessionResponseDto from './dto/CreateSessionResponseDto';

export default class FetchSessions {
  static async create(dto: CreateSessionDto) {
    const URI = 'sessions';
    const response = await FetchBackend.post('none', URI, dto);

    if (response.status === 201) {
      const json: CreateSessionResponseDto = await response.json();
      return json;
    }

    const json: HttpResponseDto = await response.json();
    const message = `Код: ${response.status} \n\n${json.message}`;
    Alert.alert('Вход в аккаунт', message);

    throw new HttpException('POST', response);
  }

  static async logout() {
    const URI = 'sessions/logout';
    const response = await FetchBackend.post('access', URI);

    if (response.status === 200) {
      return true;
    }

    if (response.status === 201) {
      return true;
    }
    return false;
  }

  static async getAll(): Promise<GetSessionsDto[]> {
    const URI = 'sessions';
    const response = await FetchBackend.get('access', URI);

    if (response.status === 200) {
      const data: GetSessionsDto[] = await response.json();
      return data;
    }

    throw new HttpException('GET', response);
  }

  static async remove(id: number) {
    const URI = `sessions/${id}`;
    const response = await FetchBackend.delete('access', URI);

    if (response.status === 200) {
      return true;
    }

    throw new HttpException('DELETE', response);
  }

  static async removeAll() {
    const response = await FetchBackend.delete('access', 'sessions');

    if (response.status === 200) {
      return true;
    }

    throw new HttpException('DELETE', response);
  }
}
