import React from 'react';
import { createStackNavigator } from 'react-navigation';
import SplashScreen from '../screens/SplashScreen';
import ChooseRouteScreen from '../screens/ChooseRouteScreen';
import DirectionSelectScreen from '../screens/DirectionSelectScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import FinalStopSelectScreen from '../screens/FinalStopSelectScreen';
import WaitForBusScreen from '../screens/WaitForBusScreen';
import BusNumberDisplayScreen from '../screens/BusNumberDisplayScreen';
import StopsLeftDestinationScreen from '../screens/StopsLeft';
import { Routes, Stops, Location, Trip, Preferences } from '../containers';

const WrappedWaitForBusScreen = Routes(Stops(Trip(WaitForBusScreen)));
const WrappedBusNumberDisplayScreen = Routes(Stops(Trip(BusNumberDisplayScreen)));
const WrappedStopsLeftDestinationScreen = Preferences(Routes(Stops(Trip(StopsLeftDestinationScreen))));

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: Routes(ChooseRouteScreen),
  DirectionSelect: Stops(DirectionSelectScreen),
  InitialStopSelect: Stops(Location(InitialStopSelectScreen)),
  FinalStopSelect: Stops(FinalStopSelectScreen),
  WaitForBus: props => <WrappedWaitForBusScreen {...props} tripKey="busNumberDisplay" />,
  DisplayBus: props => <WrappedBusNumberDisplayScreen {...props} tripKey="busNumberDisplay" />,
  StopsLeft: props => <WrappedStopsLeftDestinationScreen {...props} tripKey="stopsLeft" />,
}, { headerMode: 'none', initialRouteName: 'Splash' });
