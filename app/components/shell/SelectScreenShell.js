// Library imports
import React from 'react';
import { View } from 'react-native';

// Local imports
import ScreenShell from './ScreenShell';
import TitleText from '../text/TitleText';

export default function SelectScreenShell(props) {
  return (
    <ScreenShell
      style={{ justifyContent: 'flex-start', ...props.style }}
      onPress={props.onPress}
    >
      <View style={{ marginBottom: 40 }}>
        <TitleText>{props.titleText}</TitleText>
      </View>
      {props.children}
    </ScreenShell >
  );
}