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
        return trip && value === trip.numberOfStopsAway
      case 'minute':
        if (trip) {
          const arrivalTime = trip.predictedArrivalTime > 0
            ? trip.predictedArrivalTime
            : trip.scheduledArrivalTime
          const numberOfMinutesAway = (arrivalTime - Date.now()) / 60000
          return Math.abs(value - numberOfMinutesAway) < 1;
        } else return false;
      case 'percent':
        if (stops) {
          const multiplier = 100 / stops.length;
          return Math.abs(value - (multiplier * trip.numberOfStopsAway)) < multiplier;
        } else return false;
    }
  }

  componentDidUpdate() {
    this.props.buzzList.forEach((buzz, i) => {
      if (!this.state.completed.get(i) && this.shouldBuzz(buzz)) {
        Vibration.vibrate(
          Platform.OS === 'android'
            ? buzz.get('buzz').get('pattern').reduce((acc, p) =>
              acc.concat(List([p, 300])), List()).toArray()
            : buzz.get('buzz').get('pattern').toArray(),
          buzz.get('buzz').get('repeat')
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
        {...this.props}
        onPress={
          () => {
            Vibration.cancel();
            if (this.props.onPress) {
              this.props.onPress();
            }
          }
        }>
        <View>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}