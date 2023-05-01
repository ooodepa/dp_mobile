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
  info__block: {
    marginHorizontal: 16,
  },
  item__nameText: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 16,
  },
  characteristic__text: {
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
