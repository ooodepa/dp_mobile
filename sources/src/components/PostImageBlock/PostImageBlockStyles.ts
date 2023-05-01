import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  item__image: {
    display: 'flex',
    width: 'auto',
    height: 100,
    backgroundColor: 'white',
  },
  item__imageBlock: {
    // borderColor: '#d3d3d3',
    // borderWidth: 1,
    overflow: 'hidden',
    padding: 2,
    borderRadius: 4,
    height: 100,
    justifyContent: 'center',
  },
  item__noImageBlock: {
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default styles;
