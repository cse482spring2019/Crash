import React from 'react';
import { StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { config } from '../../config';
import { SafeAreaView } from 'react-navigation';

const CustomView = Platform.OS === 'android' ? View : SafeAreaView;

export default function ScreenShell(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <CustomView
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
      </CustomView>
    </TouchableWithoutFeedback>
  );
}
