import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Buzzer from './Buzzer';

const buzzLength = 300;

export default class GeoLocatorView extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.routes.size === 0 && nextProps.routes.size > 0) {
      this.props.selectRoute(nextProps.routes.get('542'));
    }
    if (!this.props.stops.get('0') && nextProps.stops.get('0')) {
      this.props.selectDirection('0');
      this.props.selectInitialStop(3);
      this.props.selectFinalStop(7);
      this.props.fetchTrip(
        nextProps.stops.getIn(['0', 'stops', 3, 'id']),
        this.props.routes.getIn(['542', 'id'])
      );
    }
  }

  render() {
    const { location, selection, stops } = this.props;

    let locationData = [];
    if (location.get('coords')) {
      locationData = [
        <Text key="locationTimestamp">
          Timestamp: {location.get('timestamp')}
        </Text>,
        <Text key="longitude">
          Longitude: {location.getIn(['coords', 'longitude'])}
        </Text>,
        <Text key="latitude">
          Latitude: {location.getIn(['coords', 'latitude'])}
        </Text>,
        <Text key="accuracy">
          Accuracy: {Math.round(100 * location.getIn(['coords', 'accuracy'])) / 100}
        </Text>
      ];
    } else if (location.get('error')) {
      locationData = [
        <Text key="locationTimestamp">
          Timestamp: {location.get('timestamp')}
        </Text>,
        <Text key="locationError">
          Error: {location.get('error')}
        </Text>
      ];
    } else {
      locationData.push(
        <Text key="locationWatining">Waiting...</Text>
      );
    }

    let routeData = [];
    if (selection.get('route')) {
      routeData.push(
        <Text key="routeName">
          Name: {selection.getIn(['route', 'shortName'])}
        </Text>,
      );
      if (selection.get('direction')) {
        routeData.push(
          <Text key="direction">
            Direction: {stops.getIn([selection.get('direction'), 'direction'])}
          </Text>
        );
      }
      if (selection.get('initialStop')) {
        const directionStops = stops.getIn([selection.get('direction'), 'stops']);
        const initialIndex = selection.get('initialStop');
        routeData.push(
          <Text key="initialStop">
            From: {directionStops.getIn([initialIndex, 'name'])}
          </Text>
        );
      }
      if (selection.get('finalStop')) {
        directionStops = stops.getIn([selection.get('direction'), 'stops']);
        const finalIndex = selection.get('finalStop');
        routeData.push(
          <Text key="finalStop">
            To: {directionStops.getIn([finalIndex, 'name'])}
          </Text>
        );
      }
      if (selection.get('trip')) {
        if (selection.get('trip').get('error')) {
          routeData.push(
            <Text key="trip">
              Error Getting Trip: {selection.getIn(['trip', 'payload'])}
            </Text>
          );
        } else {
          routeData.push(
            <Text key="trip">
              # Stops Away: {selection.getIn(['trip', 'payload', 'numberOfStopsAway'])}
            </Text>
          );
        }
      }
    } else {
      routeData.push(
        <Text key="routeWaiting">Waiting...</Text>
      );
    }

    return (
      <Buzzer
        buzzList={selection.get('buzzList')}
        trip={
          selection.get('trip') && selection.getIn(['trip', 'error'])
            ? null
            : selection.getIn(['trip', 'payload'])
        }
        onPress={() => Alert.alert('Buzz Click', 'clicked!')}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Location:</Text>
            {locationData}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Route:</Text>
            {routeData}
          </View>
        </View>
      </Buzzer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  section: {
    borderColor: 'black',
    borderWidth: 5,
    paddingHorizontal: 10,
  },
  sectionHeading: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
