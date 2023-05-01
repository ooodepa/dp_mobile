import {Alert} from 'react-native';

class HttpAlert {
  static alert(title: string, message: string, status: number) {
    const text = `${message}\n\n(HTTP status: ${status})`;
    Alert.alert(title, text);
  }
}

export default HttpAlert;
