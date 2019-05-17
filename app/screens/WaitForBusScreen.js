import React from 'react';
import { ScreenOrientation } from 'expo';
import { List, Map } from 'immutable';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import Buzzer from '../components/misc/Buzzer';
import { NavigationEvents } from 'react-navigation';

export default class WaitForBusScreen extends React.Component {
  constructor(props) {
    super(props);

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

    const {
      activeTrip, fetchTrip, selectedDirection, selectedInitialStop, selectedRoute,
      stops
    } = props;
    if (!activeTrip) {
      fetchTrip(
        stops.getIn([selectedDirection, 'stops', selectedInitialStop, 'id']),
        selectedRoute.get('id')
      );
    }
  }

  componentDidUpdate(prevProps) {
    const {
      stops, selectedRoute, selectedDirection, selectedInitialStop, activeTrip,
      fetchTrip, watchTrip
    } = this.props;
    if (activeTrip) {
      if (activeTrip.get('numberOfStopsAway') < 0) {
        fetchTrip(
          stops.getIn([selectedDirection, 'stops', selectedInitialStop, 'id']),
          selectedRoute.get('id')
        );
      }
      if (
        !prevProps.activeTrip
        || prevProps.activeTrip.get('id') !== activeTrip.get('id')
      ) {
        watchTrip(activeTrip);
      }
    }
  }

  componentWillUnmount() {
    const { activeTrip, stopWatchTrip } = this.props;
    if (activeTrip) {
      stopWatchTrip(activeTrip);
    }
  }

  onFocus = () => {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);

    const {
      fetchTrip, selectedDirection, selectedInitialStop, selectedRoute, stops
    } = this.props;
    fetchTrip(
      stops.getIn([selectedDirection, 'stops', selectedInitialStop, 'id']),
      selectedRoute.get('id')
    );
  }

  onBlur = () => this.componentWillUnmount()

  render() {
    return (
      <ScreenShell onPress={() => this.props.navigation.navigate('DisplayBus')}>
        <NavigationEvents
          onWillFocus={this.onFocus}
          onDidBlur={this.onBlur}
        />
        <TitleText style={{ fontWeight: 'bold', fontSize: 50 }}>
          YOU CAN PUT AWAY YOUR PHONE
        </TitleText>
        <TitleText style={{ fontWeight: 'bold', fontSize: 50 }}>
          WAIT FOR BUZZ TO ALERT BUS IS ARRIVING
        </TitleText>
        <Buzzer
          buzzList={List([
            Map({
              unit: 'stop',
              value: 1,
              buzz: Map({ pattern: List([300]), repeat: false })
            })
          ])}
          trip={this.props.activeTrip}
        />
      </ScreenShell>
    );
  }
}