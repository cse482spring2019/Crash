import React from 'react';
import OBAPicker from '../OBAPicker';

function getDirections({ stops }) {
  if (
    stops.size > 0
  ) {
    return stops.map(dir => ({
      value: dir.get('groupId'),
      label: dir.get('direction')
    })).toJS();
  } else {
    null;
  }
}

export default function AllDirections(props) {
  return (
    <OBAPicker
      options={getDirections(props)}
      {...props}
    />
  );
}
