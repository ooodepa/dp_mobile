import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 16,
    padding: 8,
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
