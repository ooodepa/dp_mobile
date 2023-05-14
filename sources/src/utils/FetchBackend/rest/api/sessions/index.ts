import FetchBackend from '../../../FetchBackend';
import GetSessionsDto from './dto/get-sessions.dto';
import CreateSessionDto from './dto/create-session.dto';
import HttpException from '../../../exceptions/HttpException';
import CreateSessionResponseDto from './dto/create-session-response.dto';

export default class FetchSessions {
  static async create(dto: CreateSessionDto) {
    const result = await FetchBackend('none', 'POST', 'sessions', dto);
    const response = result.response;

    if (response.status === 201) {
      const json: CreateSessionResponseDto = await response.json();
      return json;
    }

    throw new HttpException(result.method, response);
  }

  static async logout() {
    const result = await FetchBackend('access', 'POST', 'sessions/logout');
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async getAll() {
    const result = await FetchBackend('access', 'GET', 'sessions');
    const response = result.response;

    if (response.status === 200) {
      const data: GetSessionsDto = await response.json();
      return data;
    }

    throw new HttpException(result.method, response);
  }

  static async remove(id: number) {
    const result = await FetchBackend('access', 'DELETE', `sessions/${id}`);
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }

  static async removeAll() {
    const result = await FetchBackend('access', 'DELETE', 'sessions');
    const response = result.response;

    if (response.status === 200) {
      return true;
    }

    throw new HttpException(result.method, response);
  }
}
