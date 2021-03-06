import React from 'react';
import { View } from 'react-native';
import RobotoText from './RobotoText';

export default function VerticalText(props) {
  return (
    <View style={{ flexDirection: 'column', ...props.style }}>
      {
        props.text
          .split('')
          .map(
            (char, i) =>
              <RobotoText style={props.textStyle} key={i} bold={props.bold}>
                {char}
              </RobotoText>
          )
      }
    </View>
  );
}