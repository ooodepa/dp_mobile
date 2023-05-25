import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  order__item: {
    width: 300,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 8,
    marginVertical: 8,
    borderRadius: 8,
  },
  item__date_text: {
    color: env.appColor,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item__row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item__text: {
    color: 'black',
  },
  item__time_ago: {
    textAlign: 'right',
    color: 'lightgrey',
  },
});

export default styles;
