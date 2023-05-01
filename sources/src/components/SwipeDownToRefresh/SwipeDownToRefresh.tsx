import React from 'react';
import {View, Text} from 'react-native';

import styles from './SwipeToDownToRefreshStyles';

function SwipeDownToRefresh() {
  return (
    <View>
      <Text style={styles.text}>Протяните вниз для обновления</Text>
    </View>
  );
}

export default SwipeDownToRefresh;
