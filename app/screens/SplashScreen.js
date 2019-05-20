import React from 'react'
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';

// Makes the default splash screen for navigating to the initial stop screen. 
export default function SplashScreen(props) {
  return (
    <ScreenShell onPress={() => props.navigation.navigate('RouteSelect')}>
      <TitleText bold>
        TAP ANYWHERE TO BEGIN
      </TitleText>
    </ScreenShell>
  );
}
