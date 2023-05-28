import {Alert} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppButton from '../../components/AppButton/AppButton';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import {FormInputPassword} from '../../components/FormInput/FormInput';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'ChangePasswordPage'>;

export default function ChangePasswordPage(props: IProps) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  async function changePassword() {
    try {
      if (oldPassword.length === 0) {
        const title = 'Смена пароля';
        const message = 'Вы не ввели старый пароль';
        Alert.alert(title, message);
        return;
      }

      if (newPassword.length === 0) {
        const title = 'Смена пароля';
        const message = 'Вы не ввели новый пароль';
        Alert.alert(title, message);
        return;
      }

      await FetchUsers.changePassword({
        dp_newPassword: newPassword,
        dp_oldPassword: oldPassword,
      });

      const title = 'Смена пароля';
      let message = '\n';
      message += 'Ваш пароль умешно изменен. \n\n';
      message += 'В целях безопасности все сеансы закрыты. \n\n';
      message += 'Войдите в аккаунт с новым паролем. \n';
      Alert.alert(title, message);

      props.navigation.push('AccountPage');
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }

  return (
    <AppContainer>
      <FormInputPassword
        label="Старый пароль"
        placeholder="Введите старый пароль"
        value={oldPassword}
        setValue={event => setOldPassword(event.nativeEvent.text)}
      />
      <FormInputPassword
        label="Новый пароль"
        placeholder="Введите новый пароль"
        value={newPassword}
        setValue={event => setNewPassword(event.nativeEvent.text)}
      />
      <AppButton onPress={changePassword} text="Сменить пароль" />
    </AppContainer>
  );
}
