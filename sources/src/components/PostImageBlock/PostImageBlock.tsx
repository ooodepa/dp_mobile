import React from 'react';
import {View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import env from '../../env';
import styles from './PostImageBlockStyles';

interface IProps {
  url: string;
  height?: number;
  iconName?: string;
}

const height = 100;

export default function PostImageBlock(props: IProps) {
  return (
    <View
      style={{
        ...styles.item__imageBlock,
        height: Number(props.height) ? props.height : height,
      }}>
      {props.url !== '' ? (
        <Image
          style={{
            ...styles.item__image,
            height: Number(props.height) ? props.height : height,
          }}
          source={{uri: props.url}}
          resizeMode={'contain'}
        />
      ) : (
        <View style={styles.item__noImageBlock}>
          <Icon
            name={props.iconName ? props.iconName : 'image'}
            color={env.appColor}
            size={Number(props.height) ? props.height : height}
          />
        </View>
      )}
    </View>
  );
}
