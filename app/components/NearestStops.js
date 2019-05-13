import React from 'react';
import { Picker } from 'react-native';
import { orderByDistance } from 'geolib';

export default class NearestStops extends React.Component {
  componentWillMount() {
    this.props.fetchLocation();
  }

  componentWillReceiveProps(nextProps) {
    const { selectRoute, selectDirection, stops, routes } = this.props;
    if (routes.size === 0 && nextProps.routes.size > 0) {
      selectRoute(nextProps.routes.get('542'));
    }
    if (!stops.get(0) && nextProps.stops.get(0)) {
      selectDirection(0);
    }
  }

  getNearestStops = () => {
    const { location, selectedDirection, stops } = this.props;
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
      return orderByDistance(latLong, coords).slice(0, 3);
    } else {
      null;
    }
  }

  generateOptions = () => {
    const nearestStops = this.getNearestStops();

    if (nearestStops) {
      return (
        nearestStops
          .map(coord =>
            <Picker.Item key={coord.id} label={coord.name} value={coord.id} />
          )
          .concat([
            <Picker.Item key="none" label="My stop is not listed!" value="none" />
          ])
      );
    } else {
      return <Picker.Item label="Loading stops..." value="" />
    }
  }

  render() {
    const { selected, onSelect, style } = this.props;

    return (
      <Picker
        style={style}
        selectedValue={selected}
        onValueChange={onSelect}
      >
        {this.generateOptions()}
      </Picker>
    );
  }
}