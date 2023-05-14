import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  button__logoutAllText: {
    backgroundColor: '#dc3545',
    paddingVertical: 16,
    paddingHorizontal: 32,
    color: 'white',
    borderRadius: 8,
    width: 300,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sessions__closeText: {
    textAlign: 'center',
    backgroundColor: env.appColor,
    borderColor: env.appColor,
    color: 'white',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginTop: 16,
    fontWeight: 'bold',
  },
  sessions__date: {
    color: 'grey',
  },
  sessions__deviceNameText: {
    color: 'black',
    fontWeight: 'bold',
  },
  sessions__timeAgoText: {
    color: 'grey',
    textAlign: 'right',
  },
  session__block: {
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    padding: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  session__title: {
    textAlign: 'center',
    color: env.appColor,
    fontWeight: 'bold',
  },
  session__element: {
    width: 300,
    borderBottomColor: '#d3d3d3',
    borderBottomWidth: 2,
    paddingBottom: 8,
    marginVertical: 8,
  },
});

export default styles;
