import React from 'react'
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';

//Makes the default splash screen for navigating to the initial stop screen. 
export default class SplashScreen extends React.Component {
  render() {
    return (
      <ScreenShell onPress={() => this.props.navigation.navigate('InitialStopSelect')}>
        <TitleText style={{ fontWeight: 'bold' }}>
          TAP ANYWHERE TO BEGIN
        </TitleText>
      </ScreenShell>
    );
  }
}
