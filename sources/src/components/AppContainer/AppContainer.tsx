import {View} from 'react-native';
import React, {ReactNode} from 'react';

import styles from './AppContainerStyles';

interface IProps {
  children: ReactNode;
}

export default function AppContainer(props: IProps) {
  return <View style={styles.wrapper}>{props.children}</View>;
}
