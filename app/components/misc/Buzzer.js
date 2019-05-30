import React from 'react';
import { TouchableWithoutFeedback, Vibration, View } from 'react-native';

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
        return trip && (
          buzz.get('leq')
            ? value >= trip.get('numberOfStopsAway')
            : value === trip.get('numberOfStopsAway')
        );
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

  buzzPattern = (lst) => {
    if (lst.size > 0) {
      Vibration.vibrate(400);
      setTimeout(() => this.buzzPattern(lst.slice(1)), lst.get(0));
    }
  }

  componentDidUpdate() {
    this.props.buzzList.forEach((buzz, i) => {
      if (!this.state.completed.get(i) && this.shouldBuzz(buzz)) {
        if (buzz.getIn(['buzz', 'repeat'])) {
          Vibration.vibrate([600, 600], true);
        } else {
          this.buzzPattern(buzz.getIn(['buzz', 'pattern']));
        }
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
        }
      >
        <View style={this.props.style}>
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}