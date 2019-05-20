import React from 'react';

import RobotoText from './RobotoText';
import { config } from '../../config';

export default function TitleText(props) {
  return (
    <RobotoText
      {...props}
      style={{
        color: config.colors.backgroundText,
        fontSize: 59,
        textAlign: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </RobotoText>
  );
}
