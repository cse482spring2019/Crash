import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';

export default createStackNavigator({
  Splash: SplashScreen,
  InitialStopSelect: InitialStopSelectScreen,
  Home: HomeScreen,
}, { headerMode: 'none', initialRouteName: 'Splash' });
