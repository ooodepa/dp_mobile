import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  wrapper__content: {
    flex: 1,
    paddingHorizontal: '5%',
  },
  wrapper__footer: {
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footer_text: {
    textAlign: 'center',
    padding: 8,
    color: env.appColor,
  },
  button__wrapper: {
    backgroundColor: env.appColor,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  button__text: {
    color: 'white',
    textAlign: 'center',
  },
  account__infoBlock: {
    marginVertical: 16,
  },
  account__unpText: {
    color: '#06c',
    textAlign: 'center',
  },
  account__shortNameText: {
    color: '#06c',
    textAlign: 'center',
  },
  account__nameLegal: {
    color: 'black',
    textAlign: 'center',
  },
  account__addressText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;
