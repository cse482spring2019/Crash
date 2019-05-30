// Library imports
import React from 'react';
import { View } from 'react-native';

// Local imports
import ScreenShell from './ScreenShell';
import TitleText from '../text/TitleText';
import NextButton from '../misc/NextButton';

export default function InputScreenShell(props) {
  return (
    <ScreenShell
      accessible={false}
      style={{ justifyContent: 'space-between', ...props.style }}
      onPress={props.onPress}
    >
      <View>
        <TitleText>{props.titleText}</TitleText>
      </View>
      {props.children}
      <NextButton
        style={{ margin: -20 }}
        onPress={props.clickNext}
      >
        {props.nextButtonText || 'NEXT'}
      </NextButton>
    </ScreenShell>
  );
}