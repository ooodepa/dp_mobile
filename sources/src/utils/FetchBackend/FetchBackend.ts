import env from '../../env';
import isAccessTokenUpdated from './isAccessTokenUpdated';
import MyLocalStorage from '../MyLocalStorage/MyLocalStorage';
import UnauthorizedException from './exceptions/UnauthorizedException';

async function getAuthorization(
  type: 'none' | 'access' | 'refresh',
): Promise<any> {
  if (type === 'access') {
    const token = await MyLocalStorage.getItem('access');
    return {Authorization: `Bearer ${token}`};
  }

  if (type === 'refresh') {
    const token = await MyLocalStorage.getItem('refresh');
    return {Authorization: `Bearer ${token}`};
  }

  return {};
}

async function isUnauthorized(response: Response) {
  if (response.status === 401) {
    const isUpdated = await isAccessTokenUpdated();
    return isUpdated ? 1 : 0;
  }
  return -1;
}

async function CustomFetch(
  METHOD: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  TYPE: 'none' | 'access' | 'refresh',
  URI: string,
  BODY: any,
) {
  const URL = `${env.REACT_NATIVE__BACKEND_URL}/api/v1/${URI}`;
  console.log(`${METHOD} ${URL}`);

  const method = METHOD;
  const headers = {
    'Content-Type': 'application/json',
    ...(await getAuthorization(TYPE)),
  };
  const body = JSON.stringify(BODY);

  const response = await fetch(URL, {
    method,
    headers,
    ...(METHOD !== 'GET' ? {body} : {}),
  });

  const isUnauth = await isUnauthorized(response);

  if (isUnauth === -1) {
    return response;
  }

  if (isUnauth) {
    const response2 = await fetch(URL, {
      method,
      headers,
      ...(METHOD !== 'GET' ? {body} : {}),
    });

    if (response2.status === 401) {
      await MyLocalStorage.removeItem('access');
      await MyLocalStorage.removeItem('refresh');
      throw new UnauthorizedException();
    }

    // const isUnauth2 = await isUnauthorized(response2);

    // if (isUnauth2 === 1) {
    //   throw new UnauthorizedException();
    // }

    return response2;
  }

  return response;
}

export default class FetchBackend {
  static async get(type: 'none' | 'access' | 'refresh', URI: string) {
    return await CustomFetch('GET', type, URI, undefined);
  }

  static async post(
    type: 'none' | 'access' | 'refresh',
    URI: string,
    body: any = undefined,
  ) {
    return await CustomFetch('POST', type, URI, body);
  }

  static async patch(
    type: 'none' | 'access' | 'refresh',
    URI: string,
    body: any,
  ) {
    return await CustomFetch('PATCH', type, URI, body);
  }

  static async put(
    type: 'none' | 'access' | 'refresh',
    URI: string,
    body: any,
  ) {
    return await CustomFetch('PUT', type, URI, body);
  }

  static async delete(type: 'none' | 'access' | 'refresh', URI: string) {
    return await CustomFetch('DELETE', type, URI, undefined);
  }
}
