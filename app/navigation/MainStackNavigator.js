import React from 'react';
import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import StopsLeftDestinationScreen from '../screens/StopsLeft';
import SplashScreen from '../screens/SplashScreen';
import DirectionSelectScreen from '../screens/DirectionSelectScreen';
import InitialStopSelectScreen from '../screens/InitialStopSelectScreen';
import FinalStopSelectScreen from '../screens/FinalStopSelectScreen';
import WaitForBusScreen from '../screens/WaitForBusScreen';
import BusNumberDisplayScreen from '../screens/BusNumberDisplayScreen';
import { RidingOnBusScreen } from '../screens/RidingOnBusScreen';
import { Routes, Stops, Location, Trip, Preferences } from '../containers';

const WrappedWaitForBusScreen = Routes(Stops(Trip(WaitForBusScreen)));
const WrappedBusNumberDisplayScreen = Routes(Stops(Trip(BusNumberDisplayScreen)));
const WrappedRidingOnBusScreen = Preferences(Routes(Stops(Trip(RidingOnBusScreen))));

export default createStackNavigator({
  Splash: SplashScreen,
  RouteSelect: HomeScreen,
  //Splash: StopsLeftDestinationScreen,
  DirectionSelect: Routes(Stops(DirectionSelectScreen)),
  InitialStopSelect: Stops(Location(InitialStopSelectScreen)),
  FinalStopSelect: Stops(FinalStopSelectScreen),
  WaitForBus: props => <WrappedWaitForBusScreen {...props} tripKey="busNumberDisplay" />,
  DisplayBus: props => <WrappedBusNumberDisplayScreen {...props} tripKey="busNumberDisplay" />,
  RidingOnBus: props => <WrappedRidingOnBusScreen {...props} tripKey="ridingOnBus" />,
}, { headerMode: 'none', initialRouteName: 'Splash' });
