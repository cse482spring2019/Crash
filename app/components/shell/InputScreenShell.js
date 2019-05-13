// Library imports
import React from 'react';
import { View } from 'react-native';

// Local imports
import ScreenShell from './ScreenShell';
import TitleText from '../text/TitleText';
import SubTitleText from '../text/SubTitleText';
import NextButton from '../NextButton';

export default function InputScreenShell(props) {
  const WrappedNextButton = props.wrap(NextButton);

  return (
    <ScreenShell
      style={{ justifyContent: 'space-between', ...props.style }}
      onPress={props.onPress}
    >
      <View>
        <TitleText>{props.titleText}</TitleText>
        <SubTitleText>{props.subTitleText}</SubTitleText>
      </View>
      {props.children}
      <WrappedNextButton
        style={{ margin: -20 }}
        onPress={props.clickNext}
        text={props.nextButtonText || 'Next'}
      />
    </ScreenShell>
  );
}