import React from 'react';
import { Platform, TouchableWithoutFeedback, Vibration, View } from 'react-native';
import { List } from 'immutable';

export default class Buzzer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: this.props.buzzList.map(() => false) };
  }

  shouldBuzz(buzz) {
    const unit = buzz.get('unit');
    const value = buzz.get('value');
    const { trip, stops } = this.props;
    switch (unit) {
      case 'stop':
        return trip && value === trip.get('numberOfStopsAway');
      case 'minute':
        if (trip) {
          const arrivalTime = trip.get('predictedArrivalTime') > 0
            ? trip.get('predictedArrivalTime')
            : trip.get('scheduledArrivalTime')
          const numberOfMinutesAway = (arrivalTime - Date.now()) / 60000
          return Math.abs(value - numberOfMinutesAway) < 1;
        } else return false;
      case 'percent':
        if (stops) {
          const multiplier = 100 / stops.size;
          return Math.abs(value - (multiplier * trip.get('numberOfStopsAway'))) < multiplier;
        } else return false;
    }
  }

  componentDidUpdate() {
    this.props.buzzList.forEach((buzz, i) => {
      if (!this.state.completed.get(i) && this.shouldBuzz(buzz)) {
        Vibration.vibrate(
          Platform.OS === 'android'
            ? buzz.getIn(['buzz', 'pattern']).reduce((acc, p) =>
              acc.concat(List([p, 300])), List()).toArray()
            : buzz.getIn(['buzz', 'pattern']).toArray(),
          buzz.getIn(['buzz', 'repeat'])
        );
        this.setState({
          completed: this.state.completed.set(i, true),
        });
      }
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={
          () => {
            Vibration.cancel();
            if (this.props.onPress) {
              this.props.onPress();
            }
          }
        }>
        <View {...this.props}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}