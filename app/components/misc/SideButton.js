import React from 'react';
import { TouchableHighlight } from 'react-native';
import VerticalText from '../text/VerticalText';
import { config } from '../../config';

export default function SideButton(props) {
  return (
    <TouchableHighlight
      accessibilityRole="button"
      onPress={props.onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: props.color
      }}
    >
      <VerticalText
        bold
        textStyle={{ color: config.colors.contentText, fontSize: 45 }}
        text={props.text}
      />
    </TouchableHighlight>
  );
}