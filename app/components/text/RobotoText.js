import React from 'react';
import { Text } from 'react-native';

export default function RobotoText(props) {
  return (
    <Text
      {...props}
      style={{
        fontFamily: props.bold ? 'RobotoBold' : 'Roboto',
        ...props.style
      }}
    >
      {props.children}
    </Text>
  );
}