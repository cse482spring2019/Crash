import React from 'react'
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';

// Makes the wait screen for when the user is waiting for the bus
//on buzz, this screen will navigate to BusDisplay
export default function WaitForBus(props) {
  return (
    <ScreenShell onPress={() => props.navigation.navigate('DisplayBus')}>
      <TitleText style={{ fontWeight: 'bold', marginBottom: 40, fontSize: 50}}>
            YOU CAN PUT AWAY YOUR PHONE. 
      </TitleText>
      <TitleText style={{ fontWeight: 'bold', fontSize: 50}}>
            WAIT FOR BUZZ TO ALERT BUS IS ARRIVING. 
      </TitleText>
    </ScreenShell>
  );
}
