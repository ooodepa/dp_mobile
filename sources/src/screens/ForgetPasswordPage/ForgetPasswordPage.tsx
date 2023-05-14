import {
  View,
  Text,
  TextInput,
  Pressable,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './ForgetPasswordPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'ForgetPasswordPage'>;

function ForgetPasswordPage(props: IProps): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [emailOrLogin, setEmailOrLogin] = useState('');

  async function ForgetPassword() {
    setIsRefreshing(true);

    const title = 'Восстановление пароля';
    let message = 'Отправка сообщения...';
    Alert.alert(title, message);

    try {
      await FetchUsers.forgetPassword({emailOrLogin});
      props.navigation.navigate('LoginPage');

      message = 'Сообщение отправлено на почту';
      Alert.alert(title, message);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      message = 'Сообщение не отправлено';
      Alert.alert(title, message);

      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }

    setIsRefreshing(false);
  }

  async function onRefresh() {
    await ForgetPassword();
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }
      title="Восстановление пароля">
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

            <Pressable style={styles.form__button} onPress={ForgetPassword}>
              <Text style={styles.form__buttonText}>Отправить письмо</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </AppWrapper>
  );
}

export default ForgetPasswordPage;
