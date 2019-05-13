import React from 'react';
import TitleText from './TitleText';

export default function NextButtonText(props) {
  return (
    <TitleText style={{ ...props.style, fontWeight: 'bold', fontSize: 65 }}>
      {props.children}
    </TitleText>
  );
}