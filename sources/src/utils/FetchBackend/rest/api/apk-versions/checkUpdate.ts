import {Alert, Linking} from 'react-native';

import FetchApkVersions from '.';
import env from '../../../../../env';
import isNoInternet from '../../../isNoInternet';
import DataController from '../../../../DateConroller/DateController';

export default async function checkUpdate(): Promise<number> {
  try {
    const data = await FetchApkVersions.getLast();

    const oldDate = new Date(env.REACT_NATIVE__VER_DATE).getTime();
    const newDate = new Date(data.dp_date).getTime();
    const oldVersion = env.REACT_NATIVE__VER_VERSION;
    const newVersion = data.dp_version;
    const oldTextDate = DataController.getStringTime(
      new Date(env.REACT_NATIVE__VER_DATE),
    );
    const newTextDate = DataController.getStringTime(new Date(data.dp_date));

    if (oldDate < newDate) {
      const title = 'Доступна новая версия';

      let message = '';
      message += `Текущая версия: ${oldVersion} \n`;
      message += `от ${oldTextDate} \n`;
      message += '\n';
      message += `Новая версия: ${newVersion} \n`;
      message += `от ${newTextDate} \n`;
      message += '\n';
      message += 'Скачать новую версию приложения?';

      Alert.alert(title, message, [
        {
          text: 'Скачать',
          onPress: () => downloadFile(data.dp_url),
        },
        {
          text: 'Отмена',
        },
      ]);

      return 1;
    }

    return 0;
  } catch (exception) {
    if (isNoInternet(exception)) {
      return -1;
    }
    return -1;
  }
}

async function downloadFile(url: string) {
  try {
    await Linking.openURL(url);
  } catch (err) {
    //err
  }
}
