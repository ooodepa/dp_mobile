import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapper__content: {
    width: '100%',
    flex: 1,
  },
  wrapper__footer: {
    width: '100%',
    paddingBottom: 16,
  },
  form__textLink: {
    color: env.appColor,
    paddingVertical: 16,
    fontWeight: 'bold',
  },
  form__footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form__button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: env.appColor,
  },
  form__buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;
