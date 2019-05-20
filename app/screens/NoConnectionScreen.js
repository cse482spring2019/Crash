import React from 'react';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';

export default function NoConnectionScreen(props) {
  return (
    <ScreenShell>
      <TitleText bold style={{ fontSize: 50 }}>
        NO INTERNET CONNECTION DETECTED
      </TitleText>
      <TitleText style={{ fontSize: 50 }}>
        PLEASE RECONNECT TO THE INTERNET
      </TitleText>
    </ScreenShell>
  );
}