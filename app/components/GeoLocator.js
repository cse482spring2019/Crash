import React from 'react';
import { Platform, Text, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';

let id = 0;
export class GeoLocator extends React.Component {
  state = {
    location: null,
    error: null,
  }

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return;
    }

    this.setState({
      watchPosition: Location.watchPositionAsync(
        { accuracy: Location.Accuracy.BestForNavigation },
        (location) => this.setState({ id: id++, location })
      )
    });
  }

  componentWillUnmount() {
    if (this.state.watchPosition) this.state.watchPosition.remove();
  }

  render() {
    let text = <View><Text>Waiting..</Text></View>;
    if (this.state.errorMessage) {
      text = <View><Text>{this.state.errorMessage}</Text></View>;
    } else if (this.state.location) {
      text = <View>
        <Text>{this.state.id}</Text>
        <Text>Longitude: {this.state.location.coords.longitude},</Text>
        <Text>Latitude: {this.state.location.coords.latitude},</Text>
        <Text>Accuracy: {this.state.location.coords.accuracy}</Text>
      </View>
    }
    return text;
  }
}