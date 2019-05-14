import React from 'react';
import OBAPicker from './misc/OBAPicker';

function getStops({ selectedDirection, stops }) {
  if (
    stops.size > 0
    && selectedDirection !== undefined
  ) {
    return (
      stops
        .getIn([selectedDirection, 'stops'])
        .slice(selectedDirection)
        .map(stop => ({ value: stop.get('id'), label: stop.get('name') }))
        // left to slice
    );
  } else {
    null;
  }
}

export default function FinalStops(props) {
  return (
    <OBAPicker
      options={getStops(props)}
      {...props}
    />
  );
}
