import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  title: {
    color: env.appColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
    paddingVertical: 16,
  },
  count__block: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  count__button: {
    backgroundColor: env.appColor,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  count__buttonText: {
    color: 'white',
    fontSize: 32,
  },
  count__value: {
    color: 'black',
    fontSize: 32,
    marginHorizontal: 16,
  },
  table: {
    paddingBottom: 16,
    paddingHorizontal: '5%',
  },
  table__row: {
    flexDirection: 'row',
  },
  table__key: {
    width: '50%',
    borderRightWidth: 0,
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
  table__span2Title: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  table__span2Text: {
    textAlign: 'center',
    color: 'black',
  },
  table__span2: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
  table__value: {
    width: '50%',
    borderWidth: 1,
    borderColor: 'black',
    padding: 4,
  },
  table__keyText: {
    color: 'black',
    fontWeight: 'bold',
  },
  table__valueText: {
    color: 'black',
  },
});

export default styles;
