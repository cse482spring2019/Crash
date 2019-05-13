import React from 'react';

import RobotoText from './RobotoText';

export default function TitleText(props) {
  return (
    <RobotoText
      style={{
        color: 'white',
        fontSize: 59,
        textAlign: 'center',
        ...props.style,
      }}
    >
      {props.children}
    </RobotoText>
  );
}
