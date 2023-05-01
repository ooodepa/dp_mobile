import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  wrapper__content: {
    maxWidth: 300,
    width: '100%',
    flex: 1,
  },
  wrapper__footer: {
    maxWidth: 300,
    width: '100%',
  },
  title: {
    textAlign: 'center',
    color: env.appColor,
    fontSize: 16,
  },
  form__input: {
    borderColor: env.appColor,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    marginVertical: 8,
    color: 'black',
  },
  form__label: {
    marginTop: 16,
    color: '#737373',
  },
  form__button: {
    marginVertical: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: env.appColor,
  },
  form__buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonsBlock__block: {
    width: '50%',
    paddingHorizontal: 8,
  },
  org__key: {
    color: 'black',
    marginTop: 16,
  },
  org__value: {
    color: 'grey',
  },
});

export default styles;
