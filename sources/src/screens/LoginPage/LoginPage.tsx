import React, {useState} from 'react';
import {View, Text, TextInput, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './LoginPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import FetchSessions from '../../utils/FetchBackend/rest/api/sessions';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'LoginPage'>;

function LoginPage(props: IProps): JSX.Element {
  const [emailOrLogin, setEmailOrLogin] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    try {
      const data = await FetchSessions.create({
        emailOrLogin: emailOrLogin,
        dp_password: password,
      });

      const accessToken = data.dp_accessToken;
      const refreshToken = data.dp_refreshToken;

      await MyLocalStorage.setItem('access', accessToken);
      await MyLocalStorage.setItem('refresh', refreshToken);

      props.navigation.navigate('AccountPage');
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (isNoInternet(exception)) {
        return;
      }
    }
  }

  function toForgetPasswordPage() {
    props.navigation.navigate('ForgetPasswordPage');
  }

  function toCreateAccountPage() {
    props.navigation.navigate('RegistrationPage');
  }

  return (
    <AppWrapper title="У вас уже есть аккаунт?">
      <View style={styles.wrapper}>
        <View style={styles.wrapper__content}>
          <View style={styles.form}>
            <Text style={styles.form__label}>E-mail или логин</Text>
            <TextInput
              placeholderTextColor="#a0a0a0"
              style={styles.form__input}
              placeholder={'E-mail или логин'}
              value={emailOrLogin}
              onChange={e => setEmailOrLogin(e.nativeEvent.text)}
            />

            <Text style={styles.form__label}>Пароль</Text>
            <TextInput
              placeholderTextColor="#a0a0a0"
              style={styles.form__input}
              placeholder={'Пароль'}
              secureTextEntry={true}
              value={password}
              onChange={e => setPassword(e.nativeEvent.text)}
            />

            <View style={styles.form__inputs}>
              <Pressable onPress={toForgetPasswordPage}>
                <Text style={styles.form__textLink}>Забыли пароль?</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.wrapper__footer}>
          <View style={styles.form}>
            <View style={styles.form__footer}>
              <Pressable onPress={toCreateAccountPage}>
                <Text style={styles.form__textLink}>Создать аккаунт</Text>
              </Pressable>
              <Pressable style={styles.form__button} onPress={login}>
                <Text style={styles.form__buttonText}>Войти</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </AppWrapper>
  );
}

export default LoginPage;
