import React from 'react';
import { Text, View } from 'react-native';
import { findNearest } from 'geolib';

export default class NearestStops extends React.Component {
  componentWillReceiveProps() {
    const {
      selectRoute, selectDirection, selectInitialStop,
      stops, routes
    } = this.props;
    if (routes.size === 0 && nextProps.routes.size > 0) {
      selectRoute(nextProps.routes.get('542'));
    }
    if (!stops.get('0') && nextProps.stops.get('0')) {
      selectDirection('0');
      selectInitialStop(3);
      selectFinalStop(7);
      fetchTrip(
        nextProps.stops.getIn(['0', 'stops', 3, 'id']),
        routes.getIn(['542', 'id'])
      );
    }
  }

  render() {
    const latLong = {
      longitude: this.props.location.getIn(['coords', 'longitude']),
      latitude: this.props.location.getIn(['coords', 'latitude']),
    };
    const mixedCoords = this.props.stops.get('0').get('stops').reduce(
      (acc, s, i) => ({
        ...acc, [s.get('id')]: {
          index: i,
          name: s.get('name'),
          longitude: s.get('lon'),
          latitude: s.get('lat')
        }
      }),
      {}
    );

    return (
      <View>
        <Text>Hello</Text>
        <Text>{latLong.longitude}</Text>
        <Text>{latLong.latitude}</Text>
        <Text>{findNearest(latLong, mixedCoords).name}</Text>
        <Text>{findNearest(latLong, mixedCoords).index}</Text>
        <Text>{findNearest(latLong, mixedCoords, 1).name}</Text>
        <Text>{findNearest(latLong, mixedCoords, 1).index}</Text>
        <Text>{findNearest(latLong, mixedCoords, 2).name}</Text>
        <Text>{findNearest(latLong, mixedCoords, 2).index}</Text>
      </View>
    );
  }
}