import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Buzzer from './Buzzer';

const buzzLength = 300;

export default class GeoLocatorView extends React.Component {
  componentWillReceiveProps(nextProps) {
    const {
      selectRoute, selectDirection, selectInitialStop, selectFinalStop, fetchTrip,
      watchTrip,
      stops, routes, activeTrip
    } = this.props;
    if (routes.size === 0 && nextProps.routes.size > 0) {
      selectRoute(nextProps.routes.get('542'));
    }
    if (!stops.get(0) && nextProps.stops.get(0)) {
      selectDirection(0);
      selectInitialStop(3);
      selectFinalStop(7);
      fetchTrip(
        nextProps.stops.getIn([0, 'stops', 3, 'id']),
        routes.getIn(['542', 'id'])
      );
    }
    if (!activeTrip && nextProps.activeTrip) {
      watchTrip(nextProps.activeTrip);
    }
  }

  componentWillUnmount() {
    this.props.stopWatchTrip();
  }

  render() {
    const {
      buzzList, location, stops, selectedRoute, selectedDirection, selectedInitialStop,
      selectedFinalStop, activeTrip, activeTripError
    } = this.props;

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
    if (selectedRoute) {
      routeData.push(
        <Text key="routeName">
          Name: {selectedRoute.get('shortName')}
        </Text>,
      );
      if (selectedDirection !== undefined && selectedDirection !== null) {
        routeData.push(
          <Text key="direction">
            Direction: {stops.getIn([selectedDirection, 'direction'])}
          </Text>
        );
      }
      if (selectedInitialStop) {
        routeData.push(
          <Text key="initialStop">
            From: {stops.getIn([selectedDirection, 'stops', selectedInitialStop, 'name'])}
          </Text>
        );
      }
      if (selectedFinalStop) {
        routeData.push(
          <Text key="finalStop">
            To: {stops.getIn([selectedDirection, 'stops', selectedFinalStop, 'name'])}
          </Text>
        );
      }
      if (activeTrip) {
        routeData.push(
          <Text key="trip">
            # Stops Away: {activeTrip.get('numberOfStopsAway')}
          </Text>
        );
      } else if (activeTripError) {
        routeData.push(
          <Text key="trip">
            Error Getting Trip: {activeTripError}
          </Text>
        );
      }
    } else {
      routeData.push(
        <Text key="routeWaiting">Waiting...</Text>
      );
    }

    return (
      <Buzzer
        buzzList={buzzList}
        trip={activeTrip}
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
