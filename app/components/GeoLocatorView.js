import React from 'react';
import { Text, View } from 'react-native';

export default class GeoLocatorView extends React.Component {
  componentWillMount() {
    this.props.fetchLocation();
  }

  render() {
    const { timestamp, longitude, latitude } = this.props.location;
    return (
      <View>
        <Text>Timestamp: {timestamp},</Text>
        <Text>Longitude: {longitude},</Text>
        <Text>Latitude: {latitude}</Text>
      </View>
    );
  }
}