import React from 'react';
import {View, Text, ScrollView, RefreshControlProps} from 'react-native';

import styles from './AppWrapperStyles';

interface props {
  children: React.ReactNode;
  title?: string;
  contentInsetAdjustmentBehavior?:
    | 'automatic'
    | 'scrollableAxes'
    | 'never'
    | 'always'
    | undefined;
  refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

function AppWrapper(props: props): JSX.Element {
  return (
    <View style={styles.ScrollViewWrapper}>
      <ScrollView
        contentContainerStyle={styles.ScrollView}
        refreshControl={props.refreshControl}
        contentInsetAdjustmentBehavior={props.contentInsetAdjustmentBehavior}>
        <View style={styles.ScrollViewInner}>
          {props.title ? <Text style={styles.title}>{props.title}</Text> : null}
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
}

export default AppWrapper;
