import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapper__content: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  wrapper__footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 16,
  },
  form: {
    maxWidth: 300,
    width: '100%',
  },
  form__title: {
    color: env.appColor,
    textAlign: 'center',
    fontSize: 24,
  },
  form__textLink: {
    color: env.appColor,
    paddingVertical: 4,
  },
  form__inputs: {
    paddingVertical: 16,
  },
  form__footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form__input: {
    color: 'black',
    borderColor: env.appColor,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 8,
  },
  form__label: {
    marginTop: 16,
    color: '#737373',
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
