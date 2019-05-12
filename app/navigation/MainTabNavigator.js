import React from 'react';
import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';

export default createStackNavigator({
  Home: HomeScreen,
  InitialStop: InitialStopSelectScreen,
}, {
  headerMode: 'none',
  initialRouteName: 'InitialStop',
});
