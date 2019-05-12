import React from 'react';
import { View } from 'react-native';
import { Location, Stops } from '../containers';
import NearestStops from '../components/NearestStops';

const WrappedNearestStops = Location(Stops(NearestStops));

export default class InitialStopSelectScreen extends React.Component {
  render() {
    return (
      <View>
        <WrappedNearestStops watchLocation />
      </View>
    );
  }
}