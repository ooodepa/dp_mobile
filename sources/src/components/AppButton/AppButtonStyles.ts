import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  button: {
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    backgroundColor: env.appColor,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  button__disabled: {
    opacity: 0.5,
  },
});

export default styles;
