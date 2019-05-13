import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Location, Stops, Routes } from '../containers';
import NearestStops from '../components/NearestStops';
import InputScreenShell from '../components/shell/InputScreenShell';

const WrappedNearestStops = Routes(Location(Stops(NearestStops)));
export default class InitialStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedStop: '' };
  }

  clickNext = (props) => {
    const { selectedDirection, selectInitialStop, stops } = props;
    if (this.state.selectedStop === '' || this.state.selectedStop === 'none') {
      // Navigate to Initial Stop Select w/o Geolocation screen
      this.props.navigation.navigate('Home');
    } else {
      selectInitialStop(
        stops
          .getIn([selectedDirection, 'stops'])
          .findIndex(value => value.get('id') === this.state.selectedStop)
      );
      // Navigate to Final Stop Select screen
    }
  }

  render() {
    return (
      <InputScreenShell
        wrap={Stops}
        titleText="SELECT ORIGIN STOP"
        subTitleText="are you at..."
        clickNext={this.clickNext}
      >
        <View style={styles.nearestStopsContainer}>
          <WrappedNearestStops
            style={styles.nearestStops}
            itemStyle={styles.nearestStopsItems}
            selected={this.state.selectedStop}
            onSelect={(index) => this.setState({ selectedStop: index })}
          />
        </View>
      </InputScreenShell>
    );
  }
}

const styles = StyleSheet.create({
  nearestStopsContainer: {
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  nearestStops: {
    height: 100,
  },
});