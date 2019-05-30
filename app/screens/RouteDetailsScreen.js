import React from 'react';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import SubTitleText from '../components/text/SubTitleText';
import RobotoText from '../components/text/RobotoText';
import { config } from '../config';

// Makes the default splash screen for navigating to the initial stop screen. 
export default function RouteDetailsScreen({
  navigation, selectedDirection, selectedInitialStop, selectedFinalStop,
  selectedRoute, stops
}) {
  return (
    <ScreenShell onPress={() => navigation.navigate('WaitForBus')}>
      <SubTitleText>
        YOU HAVE SELECTED
      </SubTitleText>
      <SubTitleText>
        ROUTE
      </SubTitleText>
      <TitleText style={{ color: config.colors.contentBox }}>
        {selectedRoute.get('shortName')}
      </TitleText>
      <SubTitleText>
        FROM
      </SubTitleText>
      <TitleText style={{ color: config.colors.contentBox }}>
        {stops.getIn([selectedDirection, 'stops', selectedInitialStop, 'name'])}
      </TitleText>
      <SubTitleText>
        TO
      </SubTitleText>
      <TitleText style={{ color: config.colors.contentBox }}>
        {stops.getIn([selectedDirection, 'stops', selectedFinalStop, 'name'])}
      </TitleText>
      <SubTitleText bold>
        TAP ANYWHERE TO CONFIRM
      </SubTitleText>
    </ScreenShell>
  );
}
