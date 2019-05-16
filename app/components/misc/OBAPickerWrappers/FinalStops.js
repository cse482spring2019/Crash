import React from 'react';
import OBAPicker from '../OBAPicker';

function getStops({ selectedDirection, selectedInitialStop, stops }) {
  if (
    stops.size > 0
    && selectedDirection !== undefined
  ) {
    return (
      stops
        .getIn([selectedDirection, 'stops'])
        .slice(selectedInitialStop + 1 || 1)
        .map(stop => ({ value: stop.get('id'), label: stop.get('name') }))
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
