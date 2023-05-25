import React from 'react';
import {View, Text} from 'react-native';

import env from '../../env';
import styles from './EnvPageStyles';
import AppContainer from '../../components/AppContainer/AppContainer';

interface Env {
  [key: string]: string;
}

export default function EnvPage() {
  const obj: Env = env;
  const keys = Object.keys(obj);
  return (
    <AppContainer>
      {keys.map(e => {
        return (
          <View key={e} style={styles.element}>
            <Text style={styles.key}>{e}</Text>
            <Text style={styles.value}>{obj[e]}</Text>
          </View>
        );
      })}
    </AppContainer>
  );
}
