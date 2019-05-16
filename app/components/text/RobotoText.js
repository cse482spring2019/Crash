import React from 'react';
import { Text } from 'react-native';

export default function RobotoText(props) {
  return (
    <Text style={{ ...props.style, fontFamily: 'Roboto' }}>
      {props.children}
    </Text>
  );
}