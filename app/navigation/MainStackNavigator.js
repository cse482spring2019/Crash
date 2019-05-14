import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import StopsLeftDestinationScreen from '../screens/StopsLeft';
import SplashScreen from '../screens/SplashScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import { Routes, Stops, Location } from '../containers';

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: HomeScreen,
  DirectionSelect: HomeScreen,
  InitialStopSelect: Routes(Stops(Location(InitialStopSelectScreen))),
  FinalStopSelect: HomeScreen,
  StopsLeftDestinationScreen: Trip(Preferences(Routes(Stops(Location(StopsLeftDestinationScreen))))),
  Home: HomeScreen,
}, { headerMode: 'none', initialRouteName: 'Splash' });
