import React, {useState} from 'react';
import {View, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ForgetPasswordPageStyles';
import FormInput from '../../components/FormInput/FormInput';
import AppButton from '../../components/AppButton/AppButton';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'ForgetPasswordPage'>;

function ForgetPasswordPage(props: IProps): JSX.Element {
  const [emailOrLogin, setEmailOrLogin] = useState('');

  async function ForgetPassword() {
    const title = 'Восстановление пароля';
    let message = '';

    if (emailOrLogin.length === 0) {
      message = '\n';
      message += 'Вы не указали логин или электронную почту';
      Alert.alert(title, message);
      return;
    }

    message = '\n';
    message += 'Отправка сообщения...';
    Alert.alert(title, message);

    try {
      await FetchUsers.forgetPassword({emailOrLogin});
      props.navigation.navigate('LoginPage');

      message = '\n';
      message += 'Сообщение отправлено на почту. \n\n';
      message += 'Войдите с логином и паролем, ';
      message += 'который пришел на электронную почту. \n\n';
      message += 'После входа в аккаунт обязательно смените пароль. \n';
      Alert.alert(title, message);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      message = '\n';
      message += 'Сообщение не отправлено';
      Alert.alert(title, message);
    }
  }

  return (
    <AppWrapper title="Восстановление пароля">
      <View style={styles.wrapper}>
        <View style={styles.wrapper__content}>
          <AppContainer>
            <FormInput
              label="E-mail или логин"
              placeholder="Введите логин или электронную почту"
              value={emailOrLogin}
              setValue={e => setEmailOrLogin(e.nativeEvent.text)}
            />
          </AppContainer>
        </View>
        <View style={styles.wrapper__footer}>
          <AppContainer>
            <AppButton onPress={ForgetPassword} text="Отправить письмо" />
          </AppContainer>
        </View>
      </View>
    </AppWrapper>
  );
}

export default ForgetPasswordPage;
