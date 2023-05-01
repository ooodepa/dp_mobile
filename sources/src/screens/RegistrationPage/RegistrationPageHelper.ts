import {Alert} from 'react-native';

import RegexController from '../../utils/RegexController';

export default class RegistrationPageHelper {
  static isValidUnp(unp: string): boolean {
    if (unp.length < 9) {
      const title = 'Регистрация';
      const message = 'УНП не может содержать меньше 9 цифр';
      Alert.alert(title, message);
      return false;
    }

    if (!Number(unp)) {
      const title = 'Регистрация';
      const message = 'УНП должно состоять только из цифр';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidPhone(phone: string): boolean {
    if (phone.length < 13) {
      const title = 'Регистрация';
      const message = 'Номер телефона состоит из 12 цифр';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidLastName(lastName: string): boolean {
    if (lastName.length === 0) {
      const title = 'Регистрация';
      const message = 'Фамилия не указана';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidFirstName(firstName: string): boolean {
    if (firstName.length === 0) {
      const title = 'Регистрация';
      const message = 'Имя не указано';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidLogin(login: string): boolean {
    if (login.length === 0) {
      const title = 'Регистрация';
      const message = 'Логин не указан';
      Alert.alert(title, message);
      return false;
    }

    if (RegexController.isStringStartWithNumber(login)) {
      const title = 'Регистрация';
      const message = 'Логин не должен начинаться с цифры';
      Alert.alert(title, message);
      return false;
    }

    if (RegexController.isStringContainSpecialSymbols(login)) {
      const title = 'Регистрация';
      const message = 'Логин не может содержать специальные символы';
      Alert.alert(title, message);
      return false;
    }

    if (RegexController.isStringContainSpace(login)) {
      const title = 'Регистрация';
      const message = 'Логин не может содержать пробелы';
      Alert.alert(title, message);
      return false;
    }

    if (login.length < 3) {
      const title = 'Регистрация';
      const message = 'Логин должен содержать хотя бы 3 символа';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidEmail(email: string): boolean {
    if (email.length === 0) {
      const title = 'Регистрация';
      const message = 'Электронная почта не указана';
      Alert.alert(title, message);
      return false;
    }

    if (RegexController.isStringContainSpace(email)) {
      const title = 'Регистрация';
      const message = 'Электронная почта не может содержать пробелы';
      Alert.alert(title, message);
      return false;
    }

    if (!RegexController.isValidEmail(email)) {
      const title = 'Регистрация';
      const message =
        'Электронная не верного формата \n\n' +
        'Почта имеет форма: \n' +
        'user@site.domen \n' +
        'user@site.subdomen.domen \n';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static isValidPassword(password: string): boolean {
    if (password.length === 0) {
      const title = 'Регистрация';
      const message = 'Пароль не указан';
      Alert.alert(title, message);
      return false;
    }

    if (password.length < 8) {
      const title = 'Регистрация';
      const message = 'Пароль должен содержать хотя бы 8 символов';
      Alert.alert(title, message);
      return false;
    }

    return true;
  }

  static getClearPhone(str: string) {
    let phone = '';

    for (let i = 0; i < str.length; ++i) {
      if (isNaN(Number(str[i]))) {
        continue;
      }
      phone += str[i];
    }

    phone = `+${phone}`;

    return phone;
  }
}
