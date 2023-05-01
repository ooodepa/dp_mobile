import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  items: {
    display: 'flex',
    alignItems: 'center',
  },
  item__block: {
    backgroundColor: 'white',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    width: 300,
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
  item__text: {
    color: env.appColor,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default styles;
