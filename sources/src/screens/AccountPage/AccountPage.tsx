import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {View, Text, Pressable, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './AccountPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import RootStackParamList from '../../navigation/RootStackParamList';
import FetchSessions from '../../utils/FetchBackend/rest/api/sessions';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import UnauthorizedException from '../../utils/FetchBackend/exceptions/UnauthorizedException';

type IProps = NativeStackScreenProps<RootStackParamList, 'AccountPage'>;

function AccountPage(props: IProps): JSX.Element {
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const [accountDate, setAccountDate] = useState({
    dp_id: -1,
    dp_unp: '',
    dp_nameLegalEntity: '',
    dp_shortNameLegalEntity: '',
    dp_address: '',
  });

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    (async function () {
      const accessToken = await MyLocalStorage.getItem('access');

      if (accessToken === null || accessToken === '') {
        setIsLogin(false);
        return;
      }

      try {
        setAccountDate(await FetchUsers.findOne());
        setIsLogin(true);
      } catch (exception) {
        if (exception instanceof UnauthorizedException) {
          setIsLogin(false);
        }
        if (isNoInternet(exception)) {
          return;
        }
      }
    })();
  }, [isFocused]);

  function openLoginPage() {
    props.navigation.navigate('LoginPage');
  }

  function openCreateAccountPage() {
    props.navigation.navigate('RegistrationPage');
  }

  function openFavoritePage() {
    props.navigation.navigate('FavoritePage');
  }

  function openSessionsPage() {
    props.navigation.navigate('SessionsPage');
  }

  async function logout() {
    await FetchSessions.logout();
    setIsLogin(false);
    await MyLocalStorage.removeItem('access');
    await MyLocalStorage.removeItem('refresh');
  }

  async function openWebsite() {
    try {
      const url = 'https://de-pa.by';
      await Linking.openURL(url);
    } catch (err) {
      //err
    }
  }

  function openContactsPage() {
    props.navigation.navigate('ArticlePage', {url: 'contacts'});
  }

  function openAboutPage() {
    props.navigation.navigate('AboutPage');
  }

  return (
    <AppWrapper title={isLogin ? 'Мой профиль' : 'Войдите в профиль'}>
      <View style={styles.wrapper}>
        <View style={styles.wrapper__content}>
          {isLogin ? (
            <>
              <View style={styles.account__infoBlock}>
                <Text style={styles.account__unpText}>
                  {accountDate.dp_unp}
                </Text>
                <Text style={styles.account__shortNameText}>
                  {accountDate.dp_shortNameLegalEntity}
                </Text>
              </View>
              <Pressable
                style={styles.button__wrapper}
                onPress={openFavoritePage}>
                <Text style={styles.button__text}>Избранные</Text>
              </Pressable>
              <Pressable
                style={styles.button__wrapper}
                onPress={openSessionsPage}>
                <Text style={styles.button__text}>Устройства</Text>
              </Pressable>
              <Pressable style={styles.button__wrapper} onPress={logout}>
                <Text style={styles.button__text}>Выход с аккаунта</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable style={styles.button__wrapper} onPress={openLoginPage}>
                <Text style={styles.button__text}>Войти</Text>
              </Pressable>
              <Pressable
                style={styles.button__wrapper}
                onPress={openCreateAccountPage}>
                <Text style={styles.button__text}>Регистрация</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.wrapper__footer}>
          <Pressable onPress={openWebsite}>
            <Text style={styles.footer_text}>Наш сайт</Text>
          </Pressable>
          <Pressable onPress={openContactsPage}>
            <Text style={styles.footer_text}>Контакты</Text>
          </Pressable>
          <Pressable onPress={openAboutPage}>
            <Text style={styles.footer_text}>О приложении</Text>
          </Pressable>
        </View>
      </View>
    </AppWrapper>
  );
}

export default AccountPage;
