import env from '../../env';
import HttpAlert from '../HttpAlert';
import ToastController from '../Toast';
import MyLocalStorage from '../MyLocalStorage/MyLocalStorage';
import HttpResponseDto from '../FetchBackend/HttpResponseDto';
import UpdateSessionDto from '../FetchBackend/rest/api/sessions/dto/UpdateSessionDto';

class AccessRefreshTokenContoller {
  static async setAccessToken(token: string) {
    await MyLocalStorage.setItem('access', token);
  }

  static async setRefreshToken(token: string) {
    await MyLocalStorage.setItem('refresh', token);
  }

  static async getAccessToken(): Promise<string | null> {
    return await MyLocalStorage.getItem('access');
  }

  static async getRefreshToken(): Promise<string | null> {
    return await MyLocalStorage.getItem('refresh');
  }

  static async clear() {
    await MyLocalStorage.removeItem('access');
    await MyLocalStorage.removeItem('refresh');
  }

  static async isAccessRefreshTokensInStorage(): Promise<boolean> {
    const refreshToken = await AccessRefreshTokenContoller.getRefreshToken();
    const accessToken = await AccessRefreshTokenContoller.getAccessToken();
    console.log(await MyLocalStorage.getAll());
    return refreshToken || accessToken ? true : false;
  }

  static async isAccessTokenExist(): Promise<boolean> {
    const refreshToken = await AccessRefreshTokenContoller.getRefreshToken();
    if (!refreshToken) {
      console.log('нет refresh');
      await AccessRefreshTokenContoller.clear();
      return false;
    }

    const URL_SEGMENT = '/api/v1/sessions';
    const URL = `${env.REACT_NATIVE__BACKEND_URL}${URL_SEGMENT}`;

    try {
      const token = await AccessRefreshTokenContoller.getRefreshToken();
      ToastController.toastShort('Обновление токена доступа');
      const response = await fetch(URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const json = await response.json();
        const data: UpdateSessionDto = json;
        const access_token = data.dp_accessToken;
        await AccessRefreshTokenContoller.setAccessToken(access_token);
        ToastController.toastShort('Токен доступа обновлен');
        return true;
      }

      if (response.status === 401) {
        const json: HttpResponseDto = await response.json();
        ToastController.toastShort(json.message);
        await AccessRefreshTokenContoller.clear();
        return false;
      }

      if (response.status === 404) {
        const json: HttpResponseDto = await response.json();
        ToastController.toastShort(json.message);
        await AccessRefreshTokenContoller.clear();
        return false;
      }

      const json: HttpResponseDto = await response.json();

      const title = 'Обновление токена доступа';
      const message = json.message;
      const status = response.status;
      HttpAlert.alert(title, message, status);

      return false;
    } catch (err: any) {
      const title = 'Обновление токена доступа';
      const message = `${err}`;
      const status = err.status;
      HttpAlert.alert(title, message, status);

      return false;
    }
  }
}

export default AccessRefreshTokenContoller;
