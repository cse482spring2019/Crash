import React from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  Vibration,
  View,
} from 'react-native';
import { ScreenOrientation } from 'expo';
import { SafeAreaView } from 'react-navigation';
import { List, Map } from 'immutable';

import Buzzer from '../components/misc/Buzzer';
import RobotoText from '../components/text/RobotoText';
import SideButton from '../components/SideButton';
import ConfirmationModal from '../components/ConfirmationModal';
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

  render() {
    const CustomView = Platform.OS === 'android' ? View : SafeAreaView

    return (
      <CustomView style={styles.screen}>
        <StatusBar hidden />
        <View style={styles.main}>
          <RobotoText style={styles.confirmationText}>
            can you confirm I am getting on
          </RobotoText>
          <RobotoText style={styles.busNumber}>
            {
              this.props.activeTrip
                ? this.props.activeTrip.get('routeShortName')
                : '...'
            }
          </RobotoText>
        </View>
        <View>
          <SideButton
            onPress={() => this.setState({ modalVisible: true })}
            color={config.colors.shellBackground}
            text="YES"
          />
          <SideButton
            onPress={() => Vibration.vibrate(
              Platform.OS === 'android' ? [300, 300, 300, 300] : [300, 300]
            )}
            color={config.colors.nextButtonBackground}
            text="NO"
          />
        </View>
        <ConfirmationModal
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onYes={() => {
            Vibration.vibrate(300);
            this.setState({ modalVisible: false });
            this.props.navigation.navigate('Home');
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
    backgroundColor: '#F7B733',
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  confirmationText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 34
  },
  busNumber: {
    marginTop: -70,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 200
  },
});
