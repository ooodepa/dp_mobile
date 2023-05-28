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

    if (exception instanceof Error) {
      ToastController.toastShort(`${exception.message}`);
      return;
    }

    ToastController.toastShort(`${exception}`);
  } catch (err) {
    Alert.alert('Ошибка', `${err}`);
  }
}

export async function AsyncAlertExceptionHelper(
  exception: any,
  title: string = 'Ответ от сервера',
) {
  try {
    if (exception instanceof HttpException && exception.HTTP_STATUS !== 401) {
      const json: HttpResponseDto = await exception.RESPONSE.json();
      const message = `\n ${json.message}`;
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
      let message = '\n ';
      message += `HTTP status: ${err.HTTP_STATUS} \n`;
      message += `Method: ${err.HTTP_METHOD} \n`;
      message += `URL: ${err.HTTP_URL} \n`;
      Alert.alert(title, message);
      return;
    }

    Alert.alert('Ошибка', `${err}`);
    // eslint-disable-next-line no-console
    console.log(err);
  }
}
