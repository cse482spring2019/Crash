import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import { Routes, Stops, Location } from '../containers';
import BusNumberDisplay from '../screens/BusNumberDisplay';
import WaitForBus from '../screens/WaitForBus';

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: HomeScreen,
  DirectionSelect: HomeScreen,
  InitialStopSelect: Routes(Stops(Location(InitialStopSelectScreen))),
  FinalStopSelect: HomeScreen,
  WaitForBus: WaitForBus,
  DisplayBus: BusNumberDisplay,
  Home: HomeScreen,
}, { headerMode: 'none', initialRouteName: 'Splash' });
