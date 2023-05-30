import {
  View,
  KeyboardTypeOptions,
  TextInput,
  Text,
  TextInputChangeEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './FormInputStyles';

interface IPropsFromInput {
  label: string;
  value: any;
  setValue:
    | ((e: NativeSyntheticEvent<TextInputChangeEventData>) => void)
    | undefined;
  placeholder: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean | undefined;
}

export default function FormInput(props: IPropsFromInput) {
  return (
    <>
      <Text style={styles.form__label}>{props.label}</Text>
      <TextInput
        placeholderTextColor="#a0a0a0"
        style={styles.form__input}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.setValue}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
      />
    </>
  );
}

interface IDisabledInput {
  value: string;
  label: string;
}

export function FormDisabledInput(props: IDisabledInput) {
  return (
    <>
      <Text style={styles.form__label}>{props.label}</Text>
      <View style={styles.form__input_disabled}>
        <Text>{props.value}</Text>
      </View>
    </>
  );
}

export function FormInputPassword(props: IPropsFromInput) {
  const [showPassword, setShowPassword] = useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Text style={styles.form__label}>{props.label}</Text>
      <View style={styles.row}>
        <TextInput
          placeholderTextColor="#a0a0a0"
          style={styles.form__input}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.setValue}
          keyboardType={props.keyboardType}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={toggleShowPassword}>
          <Icon
            name={showPassword ? 'eye' : 'eye-slash'}
            color={'gray'}
            size={24}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}
