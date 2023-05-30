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
  item: {
    borderTopColor: env.appColor,
    borderTopWidth: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginVertical: 8,
  },
  item__modelText: {
    fontWeight: 'bold',
    color: 'black',
  },
  item__nameText: {
    color: '#909090',
  },
  item__costText: {
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
  },
  item__costNoNdsText: {
    textAlign: 'right',
    color: 'grey',
  },
  image: {
    display: 'flex',
    width: 'auto',
    height: 100,
  },
  item__imageBlock: {
    borderColor: '#d3d3d3',
    borderWidth: 1,
    overflow: 'hidden',
    padding: 2,
    borderRadius: 4,
    height: 100,
    justifyContent: 'center',
    // alignItems: 'center'
  },
  count__block: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
  count__button: {
    backgroundColor: env.appColor,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  count__buttonText: {
    color: 'white',
    fontSize: 32,
  },
  count__value: {
    color: 'black',
    fontSize: 32,
    marginHorizontal: 16,
  },
  img__x: {
    textAlign: 'center',
  },
});

export default styles;
