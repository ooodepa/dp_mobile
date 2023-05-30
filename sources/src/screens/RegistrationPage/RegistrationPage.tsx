import {Alert, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import FetchUnp from '../../utils/FetchUnp';
import styles from './RegistrationPageStyles';
import AppButton from '../../components/AppButton/AppButton';
import FormInput, {
  FormInputPassword,
} from '../../components/FormInput/FormInput';
import RegistrationPageHelper from './RegistrationPageHelper';
import AppWrapper from '../../components/AppWrapper/AppWrapper';
import FetchUsers from '../../utils/FetchBackend/rest/api/users';
import isNoInternet from '../../utils/FetchBackend/isNoInternet';
import RootStackParamList from '../../navigation/RootStackParamList';
import AppContainer from '../../components/AppContainer/AppContainer';
import MyLocalStorage from '../../utils/MyLocalStorage/MyLocalStorage';
import {AsyncAlertExceptionHelper} from '../../utils/AlertExceptionHelper';
import NotFoundException from '../../utils/FetchBackend/exceptions/NotFoundException';

type IProps = NativeStackScreenProps<RootStackParamList, 'RegistrationPage'>;

function RegistrationPage(props: IProps): JSX.Element {
  const lastStep = 4;
  const [step, setStep] = useState(1);
  const [unp, setUnp] = useState('');
  const [nameLegalEntity, setNameLegalEntity] = useState('');
  const [shortNameLegalEntity, setShortNameLegalEntity] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('+');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async function () {
      if (step === 0) {
        props.navigation.navigate('AccountPage');
        return;
      }
    })();
  }, [props.navigation, step]);

  async function registration() {
    if (step === 1) {
      if (!RegistrationPageHelper.isValidUnp(unp)) {
        return;
      }

      try {
        const data = await FetchUnp.getByUnp(unp);
        setNameLegalEntity(data.name);
        setShortNameLegalEntity(data.shortName);
        setAddress(data.address);
        nextStep();
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception);

        if (exception instanceof NotFoundException) {
          const title = 'Проверка УНП';
          const message = 'Такой УНП не найден';
          Alert.alert(title, message);
        }
        if (exception instanceof TypeError) {
          const title = 'Проверка УНП';
          const message = 'Нет доступа к интернету';
          Alert.alert(title, message);
        }
      }

      return;
    }

    if (step === 2) {
      nextStep();
      return;
    }

    if (step === 3) {
      if (!RegistrationPageHelper.isValidPhone(phone)) {
        return;
      }

      if (!RegistrationPageHelper.isValidLastName(lastName)) {
        return;
      }

      if (!RegistrationPageHelper.isValidFirstName(firstName)) {
        return;
      }

      nextStep();
      return;
    }

    if (step === 4) {
      if (!RegistrationPageHelper.isValidLogin(login)) {
        return;
      }

      if (!RegistrationPageHelper.isValidEmail(email)) {
        return;
      }

      if (!RegistrationPageHelper.isValidPassword(password)) {
        return;
      }

      try {
        const data = await FetchUsers.create({
          dp_login: login,
          dp_email: email,
          dp_password: password,
          dp_unp: unp,
          dp_nameLegalEntity: nameLegalEntity,
          dp_shortNameLegalEntity: shortNameLegalEntity,
          dp_address: address,
          dp_receptionPhone: RegistrationPageHelper.getClearPhone(phone),
          dp_firstName: firstName,
          dp_lastName: lastName,
          dp_middleName: middleName,
        });

        const accessToken = data.dp_accessToken;
        const refreshToken = data.dp_refreshToken;

        await MyLocalStorage.setItem('access', accessToken);
        await MyLocalStorage.setItem('refresh', refreshToken);

        props.navigation.navigate('AccountPage');
      } catch (exception) {
        await AsyncAlertExceptionHelper(exception);

        if (isNoInternet(exception)) {
          return;
        }
      }
    }
  }

  function prevStep() {
    setStep(function (stp) {
      if (stp <= 0) {
        return 0;
      }
      return stp - 1;
    });
  }

  function nextStep() {
    setStep(function (stp) {
      if (stp >= lastStep) {
        return lastStep + 1;
      }
      return stp + 1;
    });
  }

  function getTitle(): string {
    return [
      'Данные организации',
      'Это ваша организация?',
      'Данные представителя',
      'Данные аккаунта',
    ][step - 1];
  }

  return (
    <AppWrapper title={`Регистрация ${step}/${lastStep}`}>
      <View style={styles.wrapper}>
        <View style={styles.wrapper__content}>
          <AppContainer>
            <Text style={styles.title}>{getTitle()}</Text>
            {step <= 1 ? (
              <FormInput
                label="УНП"
                placeholder="Введите ваш УНП"
                value={unp}
                setValue={event =>
                  setUnp(
                    event.nativeEvent.text.trimStart().replace(/[^0-9]/g, ''),
                  )
                }
                keyboardType="number-pad"
              />
            ) : step === 2 ? (
              <>
                <Text style={styles.org__key}>Краткое наименование:</Text>
                <Text style={styles.org__value}>{shortNameLegalEntity}</Text>
                <Text style={styles.org__key}>Наименование:</Text>
                <Text style={styles.org__value}>{nameLegalEntity}</Text>
                <Text style={styles.org__key}>Адрес:</Text>
                <Text style={styles.org__value}>{address}</Text>
              </>
            ) : step === 3 ? (
              <>
                <FormInput
                  label="Телефон приёмной"
                  placeholder="Телефон приёмной"
                  value={phone}
                  setValue={event =>
                    setPhone(
                      `+${event.nativeEvent.text
                        .trimStart()
                        .replace(/[^0-9]/g, '')
                        .slice(0, 12)}`,
                    )
                  }
                  keyboardType="number-pad"
                />
                <FormInput
                  label="Фамилия"
                  placeholder="Фамилия"
                  value={lastName}
                  setValue={event =>
                    setLastName(event.nativeEvent.text.trimStart())
                  }
                />
                <FormInput
                  label="Имя"
                  placeholder="Имя"
                  value={firstName}
                  setValue={event =>
                    setFirstName(event.nativeEvent.text.trimStart())
                  }
                />
                <FormInput
                  label="Отчество"
                  placeholder="Отчество"
                  value={middleName}
                  setValue={event =>
                    setMiddleName(event.nativeEvent.text.trimStart())
                  }
                />
              </>
            ) : step === 4 ? (
              <>
                <FormInput
                  label="Логин"
                  placeholder="Логин"
                  value={login}
                  setValue={event =>
                    setLogin(event.nativeEvent.text.trimStart())
                  }
                />
                <FormInput
                  label="E-mail"
                  placeholder="E-mail"
                  value={email}
                  setValue={event =>
                    setEmail(event.nativeEvent.text.trimStart())
                  }
                />
                <FormInputPassword
                  label="Пароль"
                  placeholder="Пароль"
                  value={password}
                  setValue={event =>
                    setPassword(event.nativeEvent.text.trimStart())
                  }
                />
              </>
            ) : null}
          </AppContainer>
        </View>
        <View style={styles.wrapper__footer}>
          <AppContainer>
            <View style={styles.buttonsBlock}>
              <View style={styles.buttonsBlock__block}>
                <AppButton onPress={prevStep} text={'Назад'} />
              </View>
              <View style={styles.buttonsBlock__block}>
                <AppButton
                  onPress={registration}
                  text={'Продолжить'}
                  disabled={step > lastStep}
                />
              </View>
            </View>
          </AppContainer>
        </View>
      </View>
    </AppWrapper>
  );
}

export default RegistrationPage;
