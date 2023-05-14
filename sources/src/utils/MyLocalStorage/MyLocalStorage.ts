import AsyncStorage from '@react-native-async-storage/async-storage';

import {AsyncAlertExceptionHelper} from '../AlertExceptionHelper';

class MyLocalStorage {
  static async getItem(key: string): Promise<string | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      return 'err';
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }
}

export default MyLocalStorage;
