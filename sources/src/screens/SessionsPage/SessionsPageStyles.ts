import {StyleSheet} from 'react-native';

import env from '../../env';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  wrapper__content: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  wrapper__footer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 16,
  },
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
  sessions: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d3d3d3',
    width: 300,
    marginVertical: 16,
    padding: 8,
    borderRadius: 8,
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
});

export default styles;
