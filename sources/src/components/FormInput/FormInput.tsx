import {
  KeyboardTypeOptions,
  TextInput,
  Text,
  TextInputChangeEventData,
  NativeSyntheticEvent,
} from 'react-native';
import React from 'react';

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
