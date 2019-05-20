import React from 'react';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import { config } from '../../config';
import { SafeAreaView } from 'react-navigation';

const CustomView = Platform.OS === 'android' ? View : SafeAreaView;

export default function ScreenShell(props) {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          padding: 20,
          backgroundColor: config.colors.background,
          ...props.style
        }}
      >
        {props.children}
      </View>
    </TouchableWithoutFeedback>
  );
}
