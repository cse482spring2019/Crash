import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import GeoLocatorView from '../components/GeoLocatorView';
import { Location, Routes, Stops, Preferences, Trip } from '../containers';

const LocationView = Trip(Preferences(Stops(Routes(Location(GeoLocatorView)))));
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <LocationView watchLocation tripKey="testLocation" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F7B733',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  contentContainer: {
    paddingTop: 30,
  },
});
