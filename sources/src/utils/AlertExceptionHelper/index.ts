import {Alert} from 'react-native';

import ToastController from '../Toast';
import HttpResponseDto from '../FetchBackend/HttpResponseDto';
import HttpException from '../FetchBackend/exceptions/HttpException';
import MyLocalStorage from '../MyLocalStorage/MyLocalStorage';

export default function AlertExceptionHelper(exception: any) {
  try {
    if (
      exception instanceof TypeError &&
      exception.message === 'Network request failed'
    ) {
      ToastController.toastShort('Нет доступа к интернету...');
    }
  } catch (err) {
    Alert.alert('Ошибка', `${err}`);
  }
}

export async function AsyncAlertExceptionHelper(exception: any) {
  try {
    if (exception instanceof HttpException && exception.HTTP_STATUS !== 401) {
      const json: HttpResponseDto = await exception.RESPONSE.json();

      const title = 'Запрос на сервер (HttpException)';
      const message = `
${json.message}

Дополнительная информация:
- Method: ${exception.HTTP_METHOD}
- URL: ${exception.HTTP_URL}
- HTTP status: ${exception.HTTP_STATUS}
        `;

      Alert.alert(title, message);
      return;
    }

    if (exception instanceof HttpException && exception.HTTP_STATUS === 401) {
      await MyLocalStorage.removeItem('refresh');
      await MyLocalStorage.removeItem('access');
    }

    AlertExceptionHelper(exception);
  } catch (err) {
    if (err instanceof HttpException) {
      const title = 'Запрос на сервер (HttpException)';
      const message = `
  - Method: ${err.HTTP_METHOD}
  - URL: ${err.HTTP_URL}
  - HTTP status: ${err.HTTP_STATUS}
          `;

      Alert.alert(title, message);
      return;
    }

    Alert.alert('Ошибка', `${err}`);
  }
}
