import React from 'react';
import TitleText from './TitleText';
import { config } from '../../config';

export default function NextButtonText(props) {
  return (
    <TitleText
      bold
      style={{
        color: config.colors.contentText,
        fontSize: 65,
        ...props.style
      }}
    >
      {props.children}
    </TitleText>
  );
}