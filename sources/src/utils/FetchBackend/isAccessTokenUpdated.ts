import env from '../../env';
import ToastController from '../Toast';
import HttpException from './exceptions/HttpException';
import MyLocalStorage from '../MyLocalStorage/MyLocalStorage';
import UnauthorizedException from './exceptions/UnauthorizedException';

interface UpdateSessionDto {
  dp_accessToken: string;
}

export default async function isAccessTokenUpdated() {
  const URL_SEGMENT = '/api/v1/sessions';
  const URL = `${env.REACT_NATIVE__BACKEND_URL}${URL_SEGMENT}`;
  console.log(`PATCH ${URL}`);

  const refreshToken = await MyLocalStorage.getItem('refresh');

  if (!refreshToken) {
    await MyLocalStorage.removeItem('refresh');
    await MyLocalStorage.removeItem('access');
    throw new UnauthorizedException();
  }

  ToastController.toastShort('Обновление токена доступа...');

  const response = await fetch(URL, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  if (response.status === 200) {
    const json: UpdateSessionDto = await response.json();

    const accessToken = json.dp_accessToken;

    await MyLocalStorage.setItem('access', accessToken);

    ToastController.toastShort('Токен доступа обновлен');

    return true;
  }

  if (response.status === 401) {
    await MyLocalStorage.removeItem('access');
    await MyLocalStorage.removeItem('refresh');
    throw new UnauthorizedException();
  }

  throw new HttpException('PATCH', response);
}
