import React from 'react';
import { Text, View } from 'react-native';

export default class GeoLocatorView extends React.Component {
  render() {
    const location = this.props.location;
    const timestamp = location.get('timestamp');
    const error = location.get('error');
    const coords = location.get('coords');

    let textBlocks = [
      <Text key="timestamp">
        Timestamp: {timestamp},
      </Text>
    ];
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
        { textBlocks }
      </View>
    );
  }
}
