import React from 'react';
import { TouchableHighlight } from 'react-native';
import VerticalText from './VerticalText';

export default function SideButton(props) {
  return (
    <TouchableHighlight
      accessibilityComponentType="button"
      onPress={props.onPress}
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        backgroundColor: props.color
      }}
    >
      <VerticalText
        textStyle={{ color: 'white', fontWeight: 'bold', fontSize: 45 }}
        text={props.text}
      />
    </TouchableHighlight>
  );
}