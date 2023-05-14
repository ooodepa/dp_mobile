import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  list_empty_text: {
    marginTop: 16,
    textAlign: 'center',
    color: 'black',
  },
  like: {
    position: 'absolute',
    right: 0,
    zIndex: 1,
    padding: 8,
  },
  items: {
    display: 'flex',
    alignItems: 'center',
  },
  item__block: {
    position: 'relative',
    backgroundColor: 'white',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    width: 300,
    padding: 8,
    borderRadius: 8,
    margin: 8,
  },
  item__modelText: {
    color: 'black',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  item__nameText: {
    color: '#909090',
  },
  item__costText: {
    textAlign: 'right',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default styles;
