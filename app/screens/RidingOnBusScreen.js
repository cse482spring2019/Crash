import React from 'react';
import { Vibration, View, StyleSheet } from 'react-native';
import { ScreenOrientation } from 'expo';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import Buzzer from '../components/misc/Buzzer';
import { config } from '../config';

export class RidingOnBusScreen extends React.Component {
  constructor(props) {
    super(props);
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
    const {
      fetchTrip, selectedDirection, selectedFinalStop, selectedRoute, stops
    } = this.props;
    fetchTrip(
      stops.getIn([selectedDirection, 'stops', selectedFinalStop, 'id']),
      selectedRoute.get('id')
    );
  }

  componentDidUpdate(prevProps) {
    const { activeTrip, watchTrip } = this.props;
    if (activeTrip) {
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
      fetchTrip, selectedDirection, selectedFinalStop, selectedRoute, stops
    } = this.props;
    fetchTrip(
      stops.getIn([selectedDirection, 'stops', selectedFinalStop, 'id']),
      selectedRoute.get('id')
    );
  }

  onBlur = () => this.componentWillUnmount()

  render() {
    const { activeTrip, buzzList, navigation, stops } = this.props;
    return (
      <ScreenShell
        onPress={() => {
          Vibration.cancel();
          if (activeTrip.get('numberOfStopsAway') <= 0) {
            navigation.popToTop();
          }
        }}
      >
        {
          activeTrip && activeTrip.get('numberOfStopsAway') <= 0
            ? [
              <TitleText key="arrived" style={styles.titleText}>
                ARRIVED AT LOCATION
              </TitleText>,
              <TitleText key="tapToStop" style={styles.titleText}>
                TAP ANYWHERE TO STOP THE BUZZING
              </TitleText>
            ]
            : [
              <TitleText key="putYourPhoneAway" style={styles.titleText}>
                YOU CAN PUT AWAY YOUR PHONE
              </TitleText>,
              <View key="number" style={styles.numberBox}>
                <TitleText style={styles.number}>
                  {activeTrip ? activeTrip.get('numberOfStopsAway') : '...'}
                </TitleText>
              </View>,
              <TitleText key="stopsAway" style={styles.titleText}>
                STOPS AWAY
              </TitleText>
            ]
        }
        <Buzzer
          trip={activeTrip}
          buzzList={buzzList}
          stops={stops}
        />
      </ScreenShell>
    );
  }
}

const styles = StyleSheet.create({
  titleText: {
    fontWeight: 'bold',
    fontSize: 50,
  },
  numberBox: {
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: config.colors.nextButtonBackground,
  },
  number: {
    fontWeight: 'bold',
    fontSize: 130,
  },
});