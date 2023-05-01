import {StyleSheet} from 'react-native';

import env from './../../env';

const styles = StyleSheet.create({
  ScrollViewWrapper: {
    flex: 1,
  },
  ScrollView: {
    flexGrow: 1,
  },
  ScrollViewInner: {
    flex: 1,
  },
  title: {
    color: env.appColor,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
});

export default styles;
