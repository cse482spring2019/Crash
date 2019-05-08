import React from 'react';
import { Alert, Text } from 'react-native';
import Buzzer from './Buzzer';
import { Map, List } from 'immutable';

const buzzLength = 100;

export default class GeoLocatorView extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.routes.size === 0 && nextProps.routes.size > 0) {
      this.props.selectRoute(nextProps.routes.get('542'));
    }
  }

  render() {
    const location = this.props.location;
    const timestamp = location.get('timestamp');
    const error = location.get('error');
    const coords = location.get('coords');

    const selectedRoute = this.props.selection.get('route');

    let textBlocks = [
      <Text key="timestamp">
        Timestamp: {timestamp},
      </Text>
    ];
    if (selectedRoute) {
      textBlocks.push(
        <Text key="route">
          Route: {selectedRoute.get('shortName')} {selectedRoute.get('description')},
        </Text>
      );
      textBlocks.push(
        <Text key="stop">
          Stop: {this.props.stops.get('0').get('stops').get(0).get('name')},
        </Text>
      );
      textBlocks.push(
        <Text key="trip">
          Number of Stops Away of Nearest Trip: {
            this.props.selection.get('trip').get('payload').get('numberOfStopsAway')
          },
        </Text>
      );
    }
    if (error) {
      textBlocks.push(
        <Text key="error">
          Error: {JSON.stringify(error)}
        </Text>
      );
    } else if (coords) {
      textBlocks = textBlocks.concat([
        <Text key="longitude">
          Longitude: {coords.get("longitude")},
        </Text>,
        <Text key="latitude">
          Latitude: {coords.get("latitude")},
        </Text>,
        <Text key="accuracy">
          Accuracy: {coords.get("accuracy")}
        </Text>
      ]);
    } else {
      textBlocks =
        <Text>
          Waiting...
        </Text>;
    }

    return (
      <Buzzer
        buzzList={List([
          Map({
            unit: 'stop',
            value: 0,
            buzz: Map({ repeat: true, pattern: List([300]) }),
          }),
          Map({
            unit: 'stop',
            value: 1,
            buzz: Map({ repeat: false, pattern: List([300]) }),
          }),
          Map({
            unit: 'stop',
            value: 2,
            buzz: Map({ repeat: false, pattern: List([300, 300]) }),
          }),
        ])}
        trip={
          { numberOfStopsAway: 1 }
        }
        onPress={() => Alert.alert('Buzz Click', 'clicked!') }>
        {textBlocks}
      </Buzzer>
    );
  }
}
