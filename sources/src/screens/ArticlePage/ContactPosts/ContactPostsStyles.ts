import {StyleSheet} from 'react-native';

import env from './../../../env';

const styles = StyleSheet.create({
  item__block: {
    marginHorizontal: 8,
    marginVertical: 24,
  },
  item__name: {
    color: env.appColor,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 24,
  },
  item__text: {
    color: 'black',
    textAlign: 'center',
  },
  communicationIcons__wrapper: {
    alignItems: 'center',
  },
  communicationIcons__row: {
    flexDirection: 'row',
  },
  communicationIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    margin: 8,
    backgroundColor: env.appColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  communicationIcon__viber: {
    backgroundColor: '#735ff2',
  },
  communicationIcon__whatsapp: {
    backgroundColor: '#47c755',
  },
  communicationIcon__skype: {
    backgroundColor: '#00a4e0',
  },
  communicationIcon__telegram: {
    backgroundColor: '#29a9eb',
  },
  buttons__wrapper: {
    alignItems: 'center',
  },
  buttons__button: {
    width: 300,
    borderRadius: 8,
    margin: 8,
    padding: 8,
    backgroundColor: env.appColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons__text: {
    color: 'white',
  },
});

export default styles;
