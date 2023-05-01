import React, {useEffect, useState} from 'react';
import {View, Text, RefreshControl} from 'react-native';

import env from '../../env';
import styles from './AboutPagerStyles';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import DataController from '../../utils/DateConroller/DateController';
import checkUpdate from '../../utils/FetchBackend/rest/api/apk-versions/checkUpdate';

function AboutPage(): JSX.Element {
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

  const currentVersion = env.REACT_NATIVE__VER_VERSION;
  const currentDate = DataController.getStringTime(
    new Date(env.REACT_NATIVE__VER_DATE),
  );

  return (
    <AppWrapper
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
      <View>
        <Text style={styles.text__key}>Проверка обновления</Text>
        <Text style={styles.text__value}>{status}</Text>
      </View>
      <View style={styles.keyValueBlock}>
        <Text style={styles.text__key}>Версия приложения</Text>
        <Text style={styles.text__value}>{currentVersion}</Text>
        <Text style={styles.text__value}>от {currentDate}</Text>
      </View>
    </AppWrapper>
  );
}

export default AboutPage;
