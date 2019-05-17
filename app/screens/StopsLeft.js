import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
//import GeoLocatorView from '../components/GeoLocatorView';
import ScreenShell from '../components/shell/ScreenShell';
import InputScreenShell from '../components/shell/InputScreenShell';
import TitleText from '../components/text/TitleText';
import { Location, Routes, Stops, Preferences, Trip } from '../containers';
import InputScreenShell from '../components/shell/InputScreenShell';

//trip location details for showing on the screen. 
//const LocationView = Trip(Preferences(Stops(Routes(Location(GeoLocatorView)))));

export default class StopsLeftDestinationScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false, arrived: true};
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    clickNext = () => {

    }

    render() {
        if (!arrived) {
            return(<ScreenShell style={{ justifyContent: 'space-between', ...props.style }}>
            <View>
                <TitleText>Waiting On Bus</TitleText>
                <SubTitleText>Feel free to put your phone away</SubTitleText>
            </View>
            <View>
                <LocationView watchLocation tripKey="endLocation" />
                Your bus is 
                <View style= {{backgroundColor: 'red'}}>
                    5
                </View> 
                stops away
            </View>
            </ScreenShell>);
        } else { //getting here 
            return (
                <InputScreenShell titleText="Arrived at location"
                subTitleText="TAP ANYWHERE TO STOP BUZZING">
                </InputScreenShell>
            );
        }
        
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
  