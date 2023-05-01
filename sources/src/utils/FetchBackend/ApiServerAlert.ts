import {Alert} from 'react-native';

import env from './../../env';

export default class ApiServerAlert {
  static alert(message: string) {
    const title = 'Запрос данных с сервера';
    Alert.alert(title, message);
  }

  static noInternet(URL_SEGMENT: string) {
    const title = 'Запрос данных с сервера';

    let message = 'Нет связи с сервером \n\n';
    message += 'Подключитесь к интернету \n\n';
    message += `URI: ${URL_SEGMENT} \n\n`;
    message += `${env.REACT_NATIVE__BACKEND_URL}${URL_SEGMENT}`;

    Alert.alert(title, message);
  }

  static noOkHttp(statusCode: number, message: string, URL_SEGMENT: string) {
    const title = 'Запрос данных с сервера';

    let msg = `${message} \n\n`;
    msg += `HTTP status: ${statusCode} \n\n`;
    msg += `URL: ${URL_SEGMENT}`;

    Alert.alert(title, msg);
  }
}
