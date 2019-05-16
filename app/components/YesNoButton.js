import React from 'react';
import { TouchableHighlight } from 'react-native';
import RobotoText from './text/RobotoText';

export default function YesNoButton(props) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        width: 150,
        backgroundColor: props.color
      }}
    >
      <RobotoText
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 30
        }}
      >
        {props.text}
      </RobotoText>
    </TouchableHighlight>
  );
}