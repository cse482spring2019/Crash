import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import SplashScreen from '../screens/SplashScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import FinalStopSelectScreen from '../screens/FinalStopSelectScreen';
import WaitForBusScreen from '../screens/WaitForBusScreen';
import BusNumberDisplayScreen from '../screens/BusNumberDisplayScreen';
import { Routes, Stops, Location, Trip } from '../containers';

const WrappedWaitForBusScreen = Routes(Stops(Trip(WaitForBusScreen)));
const WrappedBusNumberDisplayScreen = Routes(Stops(Trip(BusNumberDisplayScreen)));

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: HomeScreen,
  DirectionSelect: HomeScreen,
  InitialStopSelect: Routes(Stops(Location(InitialStopSelectScreen))),
  FinalStopSelect: Stops(FinalStopSelectScreen),
  WaitForBus: props => <WrappedWaitForBusScreen {...props} tripKey="busNumberDisplay" />,
  DisplayBus: props => <WrappedBusNumberDisplayScreen {...props} tripKey="busNumberDisplay" />,
  Home: HomeScreen,
}, { headerMode: 'none', initialRouteName: 'Splash' });
