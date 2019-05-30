import React from 'react';
import { Vibration, View, StyleSheet } from 'react-native';
import { ScreenOrientation } from 'expo';
import { Map } from 'immutable';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import Buzzer from '../components/misc/Buzzer';
import { config } from '../config';

export default class StopsLeftDestinationScreen extends React.Component {
  componentWillMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    const {
      navigation, selectedDirection, selectedFinalStop, stops, watchTrip
    } = this.props;
    watchTrip(
      Map(navigation.state.params.trip).set(
        'stopId',
        stops.getIn([selectedDirection, 'stops', selectedFinalStop, 'id'])
      ).remove('stopSequence')
    );
  }

  componentWillUnmount() {
    const { activeTrip, stopWatchTrip } = this.props;
    if (activeTrip) {
      stopWatchTrip(activeTrip);
    }
  }

  render() {
    const { activeTrip, buzzList, navigation, stops } = this.props;
    return (
      <ScreenShell
        accessible={true}
        accessibilityLiveRegion="polite"
        onPress={() => {
          Vibration.cancel();
          if (activeTrip && activeTrip.get('numberOfStopsAway') <= 0) {
            navigation.popToTop();
          }
        }}
      >
        {
          activeTrip && activeTrip.get('numberOfStopsAway') === 0
            ? [
              <TitleText key="arrived" bold style={styles.titleText}>
                ARRIVED AT LOCATION
              </TitleText>,
              <TitleText key="tapToStop" style={styles.titleText}>
                TAP ANYWHERE TO STOP THE BUZZING
              </TitleText>
            ]
            : [
              <TitleText key="putYourPhoneAway" bold style={styles.titleText}>
                YOU CAN PUT AWAY YOUR PHONE
              </TitleText>,
              <View key="number" style={styles.numberBox}>
                <TitleText bold style={styles.number}>
                  {activeTrip ? activeTrip.get('numberOfStopsAway') : '...'}
                </TitleText>
              </View>,
              <TitleText key="stopsAway" bold style={styles.titleText}>
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
    fontSize: 50,
  },
  numberBox: {
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: config.colors.contentBox,
  },
  number: {
    fontSize: 130,
    color: config.colors.contentText,
  },
});