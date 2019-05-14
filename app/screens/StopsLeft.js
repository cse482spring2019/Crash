import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import GeoLocatorView from '../components/GeoLocatorView';
import { Location, Routes, Stops, Preferences, Trip } from '../containers';

//trip location details for showing on the screen. 
const LocationView = Trip(Preferences(Stops(Routes(Location(GeoLocatorView)))));

export default class StopsLeftDestinationScreen extends React.Component {
    
    render() {

    }
}