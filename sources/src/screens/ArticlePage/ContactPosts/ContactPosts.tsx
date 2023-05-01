import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, Linking, Pressable, Alert} from 'react-native';

import styles from './ContactPostsStyles';
import HelperDto from '../../../utils/FetchBackend/rest/api/helpers/dto/HelperDto';
import CommunicationTypesDto from '../../../utils/FetchBackend/rest/api/contact-types/dto/ContactTypesDto';

interface IProps {
  contacts: HelperDto[];
  communicationTypes: CommunicationTypesDto[];
}

function ContactPosts(props: IProps) {
  function getTypeIdByName(id: number): string {
    for (let i = 0; i < props.communicationTypes.length; ++i) {
      const {dp_id, dp_name} = props.communicationTypes[i];
      if (id === dp_id) {
        return dp_name;
      }
    }
    return '';
  }

  async function openLink(url: string) {
    try {
      await Linking.openURL(url);
    } catch (err) {
      //err
    }
  }

  async function openViber(phone: string) {
    const URL = `viber://add?number=${phone}`;

    try {
      const isSupported = await Linking.canOpenURL(URL);

      if (!isSupported) {
        const title = 'Viber';
        const message =
          'Не получилось открыть Viber \n\n' +
          `URL: ${URL} \n\n` +
          'Номер в Viber: \n' +
          phone;
        Alert.alert(title, message);
        return;
      }

      await Linking.openURL(URL);
    } catch (err) {
      // err
    }
  }

  async function openWhatsApp(phone: string) {
    const URL = `https://api.whatsapp.com/send?phone=${phone}`;
    await openLink(URL);
  }

  async function openSkype(login: string) {
    const URL = `skype:${login}?call`;

    try {
      const isSupported = await Linking.canOpenURL(URL);

      if (!isSupported) {
        const title = 'Skype';
        const message =
          'Не получилось открыть Skype \n\n' +
          `URL: ${URL} \n\n` +
          'Логин в Skype: \n' +
          login;
        Alert.alert(title, message);
        return;
      }

      await Linking.openURL(URL);
    } catch (err) {
      // err
    }
  }

  async function openTelegram(username: string) {
    const URL = `https://t.me/${username}`;
    await openLink(URL);
  }

  async function openPhone(phone: string) {
    let clearPhone = '';
    for (let i = 0; i < phone.length; ++i) {
      if (Number.isInteger(+phone[i])) {
        clearPhone += phone[i];
      }
    }

    const URL = `tel:${clearPhone}`;
    await openLink(URL);
  }

  async function openEmail(email: string) {
    const URL = `mailto:${email}`;
    await openLink(URL);
  }

  return (
    <View>
      {props.contacts.map(element => {
        if (element.dp_isHidden) {
          return null;
        }

        return (
          <View key={element.dp_id} style={styles.item__block}>
            <Text style={styles.item__text}>{element.dp_name}</Text>
            <View style={styles.buttons__wrapper}>
              {element.dp_helperContactTypes.map(j => {
                if (j.dp_isHidden) {
                  return null;
                }

                const communication = getTypeIdByName(j.dp_contactTypeId);

                switch (communication) {
                  case 'phone':
                    return (
                      <Pressable
                        key={j.dp_id}
                        onPress={() => openPhone(j.dp_value)}
                        style={styles.buttons__button}>
                        <Text style={styles.buttons__text}>{j.dp_value}</Text>
                      </Pressable>
                    );
                  case 'email':
                    return (
                      <Pressable
                        key={j.dp_id}
                        onPress={() => openEmail(j.dp_value)}
                        style={styles.buttons__button}>
                        <Text style={styles.buttons__text}>{j.dp_value}</Text>
                      </Pressable>
                    );
                }
              })}
            </View>
            <View style={styles.communicationIcons__wrapper}>
              <View style={styles.communicationIcons__row}>
                {element.dp_helperContactTypes.map(j => {
                  if (j.dp_isHidden) {
                    return null;
                  }

                  const communication = getTypeIdByName(j.dp_contactTypeId);

                  switch (communication) {
                    case 'viber':
                      return (
                        <Pressable
                          key={j.dp_id}
                          onPress={() => openViber(j.dp_value)}
                          style={{
                            ...styles.communicationIcon,
                            ...styles.communicationIcon__viber,
                          }}>
                          <Icon name={'whatsapp'} color={'white'} size={32} />
                        </Pressable>
                      );

                    case 'whatsapp':
                      return (
                        <Pressable
                          key={j.dp_id}
                          onPress={() => openWhatsApp(j.dp_value)}
                          style={{
                            ...styles.communicationIcon,
                            ...styles.communicationIcon__whatsapp,
                          }}>
                          <Icon name={'whatsapp'} color={'white'} size={32} />
                        </Pressable>
                      );

                    case 'skype':
                      return (
                        <Pressable
                          key={j.dp_id}
                          onPress={() => openSkype(j.dp_value)}
                          style={{
                            ...styles.communicationIcon,
                            ...styles.communicationIcon__skype,
                          }}>
                          <Icon name={'skype'} color={'white'} size={32} />
                        </Pressable>
                      );

                    case 'telegram':
                      return (
                        <Pressable
                          key={j.dp_id}
                          onPress={() => openTelegram(j.dp_value)}
                          style={{
                            ...styles.communicationIcon,
                            ...styles.communicationIcon__telegram,
                          }}>
                          <Icon name={'telegram'} color={'white'} size={32} />
                        </Pressable>
                      );
                  }
                })}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export default ContactPosts;
