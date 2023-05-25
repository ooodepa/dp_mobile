import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import env from '../../env';
import styles from './AboutPagerStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import RootStackParamList from '../../navigation/RootStackParamList';
import DataController from '../../utils/DateConroller/DateController';
import checkUpdate from '../../utils/FetchBackend/rest/api/apk-versions/checkUpdate';

type Props = NativeStackScreenProps<RootStackParamList, 'AboutPage'>;

function AboutPage(props: Props): JSX.Element {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    (async function () {
      await onRefresh();
    })();
  }, []);

  async function onRefresh() {
    setIsRefreshing(true);
    setStatus('Поиск новой версии...');

    const code = await checkUpdate();
    const time = DataController.getStringTime(new Date(), true);

    if (code === -1) {
      setStatus(`Нет связи с сервером \n (проверка от ${time})`);
      setIsRefreshing(false);
      return;
    }

    if (code === 1) {
      setStatus(`Доступна новая версия \n (проверка от ${time})`);
      setIsRefreshing(false);
      return;
    }

    setStatus(`У вас последняя версия \n (проверка от ${time})`);
    setIsRefreshing(false);
  }

  function toEnvPage() {
    props.navigation.push('EnvPage');
  }

  const currentVersion = env.REACT_NATIVE__VER_VERSION;
  const currentDate = DataController.getStringTime(
    new Date(env.REACT_NATIVE__VER_DATE),
  );

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.element}>
        <Text style={styles.key}>Статус</Text>
        <Text style={styles.value}>{status}</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.key}>Версия приложения</Text>
        <Text style={styles.value}>{currentVersion}</Text>
        <Text style={styles.value}>от {currentDate}</Text>
      </View>
      <View style={styles.element}>
        <Pressable onPress={toEnvPage}>
          <Text style={styles.text__toEnvPage}>посмотреть env</Text>
        </Pressable>
      </View>
    </AppWrapper>
  );
}

export default AboutPage;
