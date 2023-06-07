import {Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';

import FormInput from '../../components/FormInput/FormInput';
import AppButton from '../../components/AppButton/AppButton';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchOrders from '../../utils/FetchBackend/rest/api/orders';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';

type IProps = NativeStackScreenProps<RootStackParamList, 'SendCheckPage'>;

export default function SendCheckPage(props: IProps) {
  const route = useRoute();
  const params: any = route.params;
  const [isDisabled, setIsDisabled] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState('');
  const [bank, setBank] = useState('');
  const [bik, setBik] = useState('');

  useEffect(() => {
    (async function () {
      const dp_check_checkingAccount = await MyLocalStorage.getItem(
        'dp_check_checkingAccount',
      );

      if (dp_check_checkingAccount) {
        setCheckingAccount(dp_check_checkingAccount);
      }

      const dp_check_bank = await MyLocalStorage.getItem('dp_check_bank');

      if (dp_check_bank) {
        setBank(dp_check_bank);
      }

      const dp_check_bik = await MyLocalStorage.getItem('dp_check_bik');

      if (dp_check_bik) {
        setBik(dp_check_bik);
      }
    })();
  }, []);

  async function getExcelCheck() {
    setIsDisabled(true);
    const title = 'Получение счёт-фактуры';

    if (checkingAccount.length === 0) {
      const message = '\nВы не указали расчётный счёт';
      Alert.alert(title, message);
      setIsDisabled(false);
      return;
    }

    if (bank.length === 0) {
      const message = '\nВы не указали банк';
      Alert.alert(title, message);
      setIsDisabled(false);
      return;
    }

    if (bik.length === 0) {
      const message = '\nВы не указали БИК';
      Alert.alert(title, message);
      setIsDisabled(false);
      return;
    }

    try {
      const orderId: string = `${params.orderId}`;
      await FetchOrders.sendCheck(orderId, {
        dp_bank: bank,
        dp_bik: bik,
        dp_checkingAccount: checkingAccount,
      });

      setIsDisabled(false);

      await MyLocalStorage.setItem('dp_check_checkingAccount', checkingAccount);
      await MyLocalStorage.setItem('dp_check_bank', bank);
      await MyLocalStorage.setItem('dp_check_bik', bik);

      props.navigation.goBack();
    } catch (exception) {
      await AsyncAlertExceptionHelper(exception);
      setIsDisabled(false);
    }
  }

  return (
    <AppWrapper>
      <AppContainer>
        {/* <FormDisabledInput label="ID заказа" value={params.orderId} /> */}
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
          disabled={isDisabled}
        />
      </AppContainer>
    </AppWrapper>
  );
}
