import {ToastAndroid} from 'react-native';

class ToastController {
  static toastShort(message: string) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  static toastLong(message: string) {
    ToastAndroid.show(message, ToastAndroid.LONG);
  }
}

export default ToastController;
