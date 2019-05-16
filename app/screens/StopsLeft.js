import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import GeoLocatorView from '../components/GeoLocatorView';
import ScreenShell from '../components/shell/ScreenShell';
import TitleText from '../components/text/TitleText';
import { Location, Routes, Stops, Preferences, Trip } from '../containers';

//trip location details for showing on the screen. 
const LocationView = Trip(Preferences(Stops(Routes(Location(GeoLocatorView)))));

export default class StopsLeftDestinationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false};
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    clickNext = () => {

    }

    render() {
        <ScreenShell style={{ justifyContent: 'space-between', ...props.style }}>
            <View>
                <TitleText>Waiting On Bus</TitleText>
                <SubTitleText>Feel free to put your phone away</SubTitleText>
            </View>
            <View>
                <LocationView watchLocation tripKey="endLocation" />
                Your bus is {LocationView.activeTrip} stops away
            </View>
        </ScreenShell>
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    contentContainer: {
      paddingTop: 30,
    },
  });
  