import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, RefreshControl} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import styles from './SessionsPageStyles';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import DataController from '../../utils/DateConroller/DateController';
import FetchSessions from '../../utils/FetchBackend/rest/api/sessions';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import UnauthorizedException from '../../utils/FetchBackend/exceptions/UnauthorizedException';

type IProps = NativeStackScreenProps<RootStackParamList, 'SessionsPage'>;

function SessionsPage(props: IProps): JSX.Element {
  const [isLogin, setIsLogin] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sessions, setSessions] = useState([
    {dp_id: -1, dp_date: '', dp_ip: '', dp_agent: ''},
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

      setSessions(await FetchSessions.getAll());
      setIsRefreshing(false);
      setIsLogin(true);
    } catch (exception) {
      setIsRefreshing(false);
      if (exception instanceof UnauthorizedException) {
        setSessions([]);
        setIsLogin(false);
        props.navigation.navigate('AccountPage');
      }
      if (isNoInternet(exception)) {
        setIsRefreshing(false);
        return;
      }
    }
  }

  async function remove(id: number) {
    try {
      await FetchSessions.remove(id);
      await onRefresh();
    } catch (exception) {
      if (exception instanceof UnauthorizedException) {
        setIsLogin(false);
        setSessions([]);
        props.navigation.navigate('AccountPage');
      }
      if (isNoInternet(exception)) {
        return;
      }
    }
  }

  async function removeAll() {
    try {
      await FetchSessions.removeAll();
      await MyLocalStorage.removeItem('access');
      await MyLocalStorage.removeItem('refresh');
      setIsLogin(false);
      setSessions([]);
      props.navigation.navigate('AccountPage');
    } catch (exception) {
      if (exception instanceof UnauthorizedException) {
        setIsLogin(false);
        setSessions([]);
        props.navigation.navigate('AccountPage');
      }
      if (isNoInternet(exception)) {
        return;
      }
    }
  }

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.wrapper}>
        <View style={styles.wrapper__content}>
          {!isLogin
            ? null
            : sessions[0]?.dp_id === -1
            ? null
            : sessions.map(element => {
                const date = new Date(element.dp_date);
                const strDate = DataController.getStringTime(date);
                const timeAgo = DataController.getTimeAgo(date);
                return (
                  <View key={element.dp_id} style={styles.sessions}>
                    <Text style={styles.sessions__deviceNameText}>
                      {element.dp_agent}
                    </Text>
                    <Text>IP: {element.dp_ip}</Text>
                    <Text style={styles.sessions__date}>{strDate}</Text>
                    <Text style={styles.sessions__timeAgoText}>{timeAgo}</Text>
                    <Pressable onPress={() => remove(element.dp_id)}>
                      <Text style={styles.sessions__closeText}>
                        Завершить сеанс
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
        </View>

        <View style={styles.wrapper__footer}>
          {!isLogin ? null : (
            <Pressable onPress={removeAll}>
              <Text style={styles.button__logoutAllText}>
                Завершить все сеансы
              </Text>
            </Pressable>
          )}
        </View>
      </View>
    </AppWrapper>
  );
}

export default SessionsPage;
