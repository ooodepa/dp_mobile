import {Alert} from 'react-native';
import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';

import FormInput, {
  FormDisabledInput,
} from '../../components/FormInput/FormInput';
import AppButton from '../../components/AppButton/AppButton';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchOrders from '../../utils/FetchBackend/rest/api/orders';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'SendCheckPage'>;

export default function SendCheckPage(props: IProps) {
  const route = useRoute();
  const params: any = route.params;
  const [checkingAccount, setCheckingAccount] = useState('');
  const [bank, setBank] = useState('');
  const [bik, setBik] = useState('');

  async function getExcelCheck() {
    const title = 'Получение счёт-фактуры';

    if (checkingAccount.length === 0) {
      const message = '\nВы не указали расчётный счёт';
      Alert.alert(title, message);
      return;
    }

    if (bank.length === 0) {
      const message = '\nВы не указали банк';
      Alert.alert(title, message);
      return;
    }

    if (bik.length === 0) {
      const message = '\nВы не указали БИК';
      Alert.alert(title, message);
      return;
    }

    try {
      const orderId: string = `${params.orderId}`;
      await FetchOrders.sendCheck(orderId, {
        dp_bank: bank,
        dp_bik: bik,
        dp_checkingAccount: checkingAccount,
      });
      props.navigation.goBack();
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
    }
  }

  return (
    <AppWrapper>
      <AppContainer>
        <FormDisabledInput label="ID заказа" value={params.orderId} />
        <FormInput
          label="Расчётный счёт"
          placeholder="Введите расчётный счёт"
          value={checkingAccount}
          setValue={event => setCheckingAccount(event.nativeEvent.text)}
        />
        <FormInput
          label="Банк"
          placeholder="Введите ваш банк"
          value={bank}
          setValue={event => setBank(event.nativeEvent.text)}
        />
        <FormInput
          label="БИК"
          placeholder="Введите БИК"
          value={bik}
          setValue={event => setBik(event.nativeEvent.text)}
        />
        <AppButton
          onPress={getExcelCheck}
          text="Получить excel счёт на почту"
        />
      </AppContainer>
    </AppWrapper>
  );
}
