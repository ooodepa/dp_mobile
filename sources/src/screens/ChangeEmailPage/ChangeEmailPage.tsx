import {Alert} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import AppButton from '../../components/AppButton/AppButton';
import FormInput from '../../components/FormInput/FormInput';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'ChangeEmailPage'>;

export default function ChangeEmailPage(props: IProps) {
  const [newEmail, setNewEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  async function changeEmail() {
    try {
      setIsDisabled(true);
      if (newEmail.length === 0) {
        const title = 'Смена электронной почты';
        const message = 'Вы не ввели электронную почту';
        Alert.alert(title, message);
        return;
      }

      await FetchUsers.changeEmail({
        dp_email: newEmail,
      });

      const title = 'Смена электронной почты';
      let message = '\n';
      message += 'Проверьте свою старую электронную почту. \n';
      Alert.alert(title, message);

      setIsDisabled(false);
      props.navigation.goBack();
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      setIsDisabled(false);
    }
  }

  return (
    <AppWrapper>
      <AppContainer>
        <FormInput
          label="Новый e-mail"
          placeholder="Введите новую электронную"
          value={newEmail}
          setValue={event => setNewEmail(event.nativeEvent.text)}
        />
        <AppButton
          onPress={changeEmail}
          text="Сменить e-mail"
          disabled={isDisabled}
        />
      </AppContainer>
    </AppWrapper>
  );
}
