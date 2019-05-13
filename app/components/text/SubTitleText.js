import React from 'react';

import TitleText from './TitleText';

export default function SubTitleText(props) {
  return (
    <TitleText style={{ fontSize: 43, ...props.style }}>
      {props.children}
    </TitleText>
  );
}
