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
        .toJS()
        .map(stop => ({ value: stop.id, label: stop.name }))
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
