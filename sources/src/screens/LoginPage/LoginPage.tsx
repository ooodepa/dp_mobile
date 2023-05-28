import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './LoginPageStyles';
import FormInput, {
  FormInputPassword,
} from '../../components/FormInput/FormInput';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
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
      await AsyncAlertExceptionHelper(exception, 'Аутентификация');

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
          <AppContainer>
            <FormInput
              label="E-mail или логин"
              placeholder="Введите логин или электронную почту"
              value={emailOrLogin}
              setValue={e => setEmailOrLogin(e.nativeEvent.text)}
            />
            <FormInputPassword
              label="Пароль"
              placeholder="Введите пароль"
              value={password}
              setValue={e => setPassword(e.nativeEvent.text)}
            />
            <Pressable onPress={toForgetPasswordPage}>
              <Text style={styles.form__textLink}>Забыли пароль?</Text>
            </Pressable>
          </AppContainer>
        </View>
        <View style={styles.wrapper__footer}>
          <AppContainer>
            <View style={styles.form__footer}>
              <Pressable onPress={toCreateAccountPage}>
                <Text style={styles.form__textLink}>Создать аккаунт</Text>
              </Pressable>
              <Pressable style={styles.form__button} onPress={login}>
                <Text style={styles.form__buttonText}>Войти</Text>
              </Pressable>
            </View>
          </AppContainer>
        </View>
      </View>
    </AppWrapper>
  );
}

export default LoginPage;
