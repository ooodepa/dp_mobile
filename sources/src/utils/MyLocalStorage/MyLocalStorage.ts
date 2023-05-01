import AsyncStorage from '@react-native-async-storage/async-storage';

interface Dictionary<T> {
  [Key: string]: T;
}

class MyLocalStorage {
  static async getAll() {
    let keys: any = [];

    try {
      keys = await AsyncStorage.getAllKeys();

      let dict: Dictionary<string | null> = {};
      let count = 0;
      for (let i = 0; i < keys.length; ++i) {
        const key: string = keys[i];
        const value: string | null = await MyLocalStorage.getItem(key);
        dict[key] = value;
        count += 1;
      }

      dict['length'] = `${count}`;

      return dict;
    } catch (err) {
      return {};
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (err) {
      return 'err';
    }
  }

  static async setItem(key: string, value: string) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (err) {
      // save error
    }
  }

  static async removeItem(key: string) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      // remove error
    }
  }
}

export default MyLocalStorage;
