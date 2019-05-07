import React from 'react';
import { Text, View } from 'react-native';

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
          Route: {selectedRoute.get('shortName')} {selectedRoute.get('description')}
        </Text>
      );
      textBlocks.push(
        <Text key="stop">
          Stop: {this.props.stops.get('0').get('stops').get(0).get('name')}
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
      <View>
        {textBlocks}
      </View>
    );
  }
}
