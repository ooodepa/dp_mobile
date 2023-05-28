import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  form__input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    padding: 8,
    marginVertical: 8,
    borderRadius: 4,
    color: 'black',
    backgroundColor: 'white',
  },
  form__label: {
    color: env.appColor,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  row: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleButton: {
    position: 'absolute',
    right: 0,
    marginRight: 8,
  },
});

export default styles;
