import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
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
});

export default styles;
