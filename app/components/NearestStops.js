import React from 'react';
import { orderByDistance } from 'geolib';
import OBAPicker from './misc/OBAPicker';

function getNearestStops({ location, selectedDirection, stops }) {
  if (
    location.getIn(['coords', 'longitude'])
    && stops.size > 0
    && selectedDirection !== undefined
  ) {
    const latLong = {
      longitude: location.getIn(['coords', 'longitude']),
      latitude: location.getIn(['coords', 'latitude']),
    };
    const coords = stops.getIn([selectedDirection, 'stops']).reduce(
      (acc, s) => [
        ...acc,
        {
          id: s.get('id'),
          name: s.get('name'),
          longitude: s.get('lon'),
          latitude: s.get('lat'),
        }
      ],
      []
    );
    return (
      orderByDistance(latLong, coords)
        .slice(0, 3)
        .map(stop => ({ value: stop.id, label: stop.name }))
        .concat([{ value: 'none', label: 'My stop is not listed!' }])
    );
  } else {
    null;
  }
}

export default function NearestStops(props) {
  return (
    <OBAPicker
      options={getNearestStops(props)}
      {...props}
    />
  );
}
