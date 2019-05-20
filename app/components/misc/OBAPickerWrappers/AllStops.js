import React from 'react';
import OBAPicker from '../OBAPicker';

function getStops({ selectedDirection, stops }) {
  if (
    stops.size > 0
    && selectedDirection !== undefined
  ) {
    return (
      stops
        .getIn([selectedDirection, 'stops'])
        .toJS()
        .map(stop => ({ value: stop.id, label: stop.name }))
    );
  } else {
    null;
  }
}

export default function AllStops(props) {
  return (
    <OBAPicker
      options={getStops(props)}
      {...props}
    />
  );
}
