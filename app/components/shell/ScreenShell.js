import React from 'react';
import { StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { config } from '../../config';

export default function ScreenShell(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          padding: 20,
          backgroundColor: config.colors.shellBackground,
          ...props.style
        }}
      >
        <StatusBar hidden />
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
}
