import React from 'react';

import TitleText from './TitleText';

export default function SubTitleText(props) {
  return (
    <TitleText {...props} style={{ fontSize: 34, ...props.style }}>
      {props.children}
    </TitleText>
  );
}
