import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './SessionsPageStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import DataController from '../../utils/DateConroller/DateController';
import FetchSessions from '../../utils/FetchBackend/rest/api/sessions';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import UnauthorizedException from '../../utils/FetchBackend/exceptions/UnauthorizedException';
import HttpException from '../../utils/FetchBackend/exceptions/HttpException';

type IProps = NativeStackScreenProps<RootStackParamList, 'SessionsPage'>;

function SessionsPage(props: IProps): JSX.Element {
  const [isLogin, setIsLogin] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    dp_id: -1,
    dp_date: '',
    dp_ip: '',
    dp_agent: '',
  });
  const [otherSessions, setOtherSessions] = useState([
    {
      dp_id: -1,
      dp_date: '',
      dp_ip: '',
      dp_agent: '',
    },
  ]);

  useEffect(function () {
    (async function () {
      setIsRefreshing(false);
      await onRefresh();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);
    try {
      const accessToken = await MyLocalStorage.getItem('access');

      if (accessToken === null || accessToken === '') {
        setIsLogin(false);
        setIsRefreshing(false);
        return;
      }

      const data = await FetchSessions.getAll();
      setCurrentSession(data.dp_current);
      setOtherSessions(data.dp_other);
      setIsRefreshing(false);
      setIsLogin(true);
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      if (exception instanceof HttpException && exception.HTTP_STATUS === 401) {
        setIsLogin(false);
        setOtherSessions([]);
        props.navigation.navigate('AccountPage');
      }
    }
    setIsRefreshing(false);
  }

  async function remove(id: number) {
    try {
      await FetchSessions.remove(id);
      await onRefresh();
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }

  async function removeAll() {
    try {
      await FetchSessions.removeAll();
      await MyLocalStorage.removeItem('access');
      await MyLocalStorage.removeItem('refresh');
      setIsLogin(false);
      setOtherSessions([]);
      props.navigation.navigate('AccountPage');
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);

      if (exception instanceof UnauthorizedException) {
        setIsLogin(false);
        setOtherSessions([]);
        props.navigation.navigate('AccountPage');
      }
      if (isNoInternet(exception)) {
        return;
      }
    }
  }

  const date = new Date(currentSession.dp_date);
  const strDate = DataController.getStringTime(date);
  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.session__block}>
        <Text style={styles.session__title}>Это устройство</Text>

        <View style={styles.session__element}>
          <Text style={styles.sessions__deviceNameText}>
            {currentSession.dp_agent}
          </Text>
          <Text>IP: {currentSession.dp_ip}</Text>
          <Text style={styles.sessions__date}>{strDate}</Text>
        </View>
        {!isLogin ? null : (
          <Pressable onPress={removeAll}>
            <Text style={styles.button__logoutAllText}>
              Завершить все сеансы
            </Text>
          </Pressable>
        )}
      </View>

      {!isLogin ? null : !otherSessions.length ? null : (
        <View style={styles.session__block}>
          <Text style={styles.session__title}>Активные сеансы</Text>

          {otherSessions.map(element => {
            const otherDate = new Date(element.dp_date);
            const otherStrDate = DataController.getStringTime(otherDate);
            const otherTimeAgo = DataController.getTimeAgo(otherDate);
            return (
              <View key={element.dp_id} style={styles.session__element}>
                <Text style={styles.sessions__deviceNameText}>
                  {element.dp_agent}
                </Text>
                <Text>IP: {element.dp_ip}</Text>
                <Text style={styles.sessions__date}>{otherStrDate}</Text>
                <Text style={styles.sessions__timeAgoText}>{otherTimeAgo}</Text>
                <Pressable onPress={() => remove(element.dp_id)}>
                  <Text style={styles.sessions__closeText}>
                    Завершить сеанс
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )}
    </AppWrapper>
  );
}

export default SessionsPage;
