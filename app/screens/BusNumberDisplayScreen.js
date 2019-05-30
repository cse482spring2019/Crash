import React from 'react';
import {
  Platform,
  StyleSheet,
  Vibration,
  View,
  Text
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView, NavigationEvents } from 'react-navigation';
import { List, Map } from 'immutable';

import Buzzer from '../components/misc/Buzzer';
import RobotoText from '../components/text/RobotoText';
import SideButton from '../components/misc/SideButton';
import ConfirmationModal from '../components/misc/ConfirmationModal';
import { config } from '../config';

export default class BusNumberDisplayScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };

    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
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
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

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
    const CustomView = Platform.OS === 'android' ? View : SafeAreaView;

    const busNum = this.props.activeTrip ? this.props.activeTrip.get('routeShortName') : '...';
    const x = Math.max(busNum.length, 3);
    const a = 1102.3;
    const b = -1.05412;
    const eqn = (a * Math.pow(x, b));

    return (
      <CustomView style={styles.screen}>
        <NavigationEvents
          onWillFocus={this.onFocus}
          onDidBlur={this.onBlur}
        />
        <View accessible="true" style={styles.main}>
          <RobotoText bold style={styles.confirmationText}>
            AM I GETTING ON BUS
          </RobotoText>
          <View style={styles.busNumberContainer}>
            <Text
              style={{
                ...styles.busNumber,
                fontSize: eqn,
              }}
            >
              {busNum}
            </Text>
          </View>
        </View>
        <View>
          <SideButton
            accessibilityRole="button"
            accessibilityLabel="yes button"
            accessibilityHint="press to indicate a yes"
            onPress={() => {
              Vibration.vibrate(300);
              this.setState({ modalVisible: true });
            }}
            color={config.colors.contentBox}
            text="YES"
          />
          <SideButton
            accessibilityRole="button"
            accessibilityLabel="no button"
            accessibilityRole="press to indicate a no"
            onPress={() => {
              const f = (lst = [600, 600]) => {
                if (lst.length > 0) {
                  Vibration.vibrate(400);
                  setTimeout(() => f(lst.slice(1)), lst[0]);
                }
              }
              setTimeout(f, 0);
            }}
            color={config.colors.warning}
            text="NO"
          />
        </View>
        <ConfirmationModal

          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onYes={() => {
            Vibration.vibrate(300);
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('StopsLeft', { trip: this.props.activeTrip });
          }}
          onNo={() => this.setState({ modalVisible: false })}
        />
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
      </CustomView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: config.colors.backgroundText,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  confirmationText: {
    color: config.colors.background,
    padding: 10,
    fontSize: 27
  },
  busNumberContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  busNumber: {
    marginTop: Platform.OS === 'ios' ? -50 : 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontFamily: 'RobotoMono',
    color: config.colors.background,
  },
});
