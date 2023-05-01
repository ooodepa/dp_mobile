import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  search__container: {
    width: '100%',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  search__input: {
    fontSize: 16,
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  search__item: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#d3d3d3',
    borderRadius: 8,
    marginVertical: 2,
    paddingHorizontal: 16,
    paddingVertical: 4,
    overflow: 'hidden',
    numberOfLines: 1,
  },
  search__itemText: {
    color: 'black',
  },
});

export default styles;
