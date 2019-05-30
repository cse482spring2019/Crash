import React from 'react';
import { TouchableHighlight } from 'react-native';
import RobotoText from '../text/RobotoText';
import { config } from '../../config';

export default function YesNoButton(props) {
  return (
    <TouchableHighlight
      accessibilityRole="button"
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: props.color,
        ...props.style
      }}
    >
      <RobotoText
        bold
        style={{
          color: config.colors.contentText,
          fontSize: 30
        }}
      >
        {props.text}
      </RobotoText>
    </TouchableHighlight>
  );
}