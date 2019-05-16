import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import FinalStopSelectScreen from '../screens/FinalStopSelectScreen';
import { Routes, Stops, Location } from '../containers';

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: HomeScreen,
  DirectionSelect: HomeScreen,
  InitialStopSelect: Routes(Stops(Location(InitialStopSelectScreen))),
  FinalStopSelect: Stops(FinalStopSelectScreen),
  Home: HomeScreen,
}, { headerMode: 'none', initialRouteName: 'Splash' });
