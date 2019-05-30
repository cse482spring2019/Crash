import React from 'react';
import { ScreenOrientation } from 'expo';
import { List, Map } from 'immutable';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import Buzzer from '../components/misc/Buzzer';
import { NavigationEvents } from 'react-navigation';
import SubTitleText from '../components/text/SubTitleText';

export default class WaitForBusScreen extends React.Component {
  constructor(props) {
    super(props);
    this.componentDidUpdate();
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
      } else if (
        prevProps && (
          !prevProps.activeTrip
          || prevProps.activeTrip.get('id') !== activeTrip.get('id')
        )
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
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);

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
      <ScreenShell
        onPress={() => {
          if (this.props.activeTrip) {
            this.props.navigation.navigate('DisplayBus');
          }
        }}
      >
        <NavigationEvents
          onWillFocus={this.onFocus}
          onDidBlur={this.onBlur}
        />
        {
          this.props.activeTripError
            ? [
              <TitleText key="noArrivals" bold style={{ fontSize: 50 }}>
                NO BUSES OF THIS ROUTE WILL ARRIVE IN THE NEXT 60 MINUTES
              </TitleText>,
              <SubTitleText key="tryAgain" style={{ fontSize: 36 }}>
                PLEASE SELECT A DIFFERENT ROUTE OR TRY AGAIN LATER
              </SubTitleText>
            ]
            : this.props.activeTrip
              ? [
                <TitleText key="waitForBus" bold style={{ fontSize: 50 }}>
                  WAIT FOR BUZZ TO ALERT BUS IS ARRIVING
              </TitleText>,
                <SubTitleText key="tapAnywhere" style={{ fontSize: 36 }}>
                  TAP ANYWHERE TO STOP THE BUZZING
              </SubTitleText>
              ]
              : <TitleText bold style={{ fontSize: 50 }}>Loading...</TitleText>
        }
        <Buzzer
          buzzList={List([
            Map({
              unit: 'stop',
              value: 1,
              leq: true,
              buzz: Map({ pattern: List([300]), repeat: false })
            })
          ])}
          trip={this.props.activeTrip}
        />
      </ScreenShell>
    );
  }
}