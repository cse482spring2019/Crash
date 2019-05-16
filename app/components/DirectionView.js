import React from 'react';
import { Alert, StyleSheet, Text, View, Picker, Button } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import OBAPicker from './misc/OBAPicker';
// import ScreenShell from '../components/shell/ScreenShell';
// import TitleText from '../components/text/TitleText';


export default class DirectionView extends React.Component {

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

  getDirections() {
    const {
      buzzList, location, stops, selectedRoute, selectedDirection, selectedInitialStop,
      selectedFinalStop, activeTrip, activeTripError
    } = this.props;
      if (
          stops.size > 0
        ) {
          return (
              stops.map(stop => ({value: stop.get('groupId'), label: stop.get('direction')}))
          );
      } else {
          null;
      }
  }

  render() {
    const {
      buzzList, location, stops, selectedRoute, selectedDirection, selectedInitialStop,
      selectedFinalStop, activeTrip, activeTripError
    } = this.props;

    return (

            <OBAPicker
              options={this.getDirections()}
              {...this.props}
            />

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

  sectionHeading: {
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 32,
  },
});
