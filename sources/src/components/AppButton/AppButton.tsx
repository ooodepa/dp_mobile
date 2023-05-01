import {Pressable, Text, GestureResponderEvent} from 'react-native';
import styles from './AppButtonStyles';
import React from 'react';

interface IProps {
  onPress: null | ((event: GestureResponderEvent) => void) | undefined;
  text: String;
  disabled?: boolean;
}

export default function AppButton(props: IProps) {
  return (
    <Pressable
      style={{
        ...styles.button,
        ...(props.disabled ? styles.button__disabled : null),
      }}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.buttonText}>{props.text}</Text>
    </Pressable>
  );
}
