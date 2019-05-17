import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
//import GeoLocatorView from '../components/GeoLocatorView';
import ScreenShell from '../components/shell/ScreenShell';
import InputScreenShell from '../components/shell/InputScreenShell';
import TitleText from '../components/text/TitleText';
import SubTitleText from '../components/text/SubTitleText'
import { Location, Routes, Stops, Preferences, Trip } from '../containers';


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
        if (!this.state.arrived) {
            return(<ScreenShell style={{ justifyContent: 'space-between'}}>
            <View>
                <TitleText>Waiting On Bus</TitleText>
                <SubTitleText>Feel free to put your phone away</SubTitleText>
            </View>
            <View>
                <SubTitleText>Your bus is </SubTitleText>
                <View style= {{backgroundColor: 'red'}}>
                    <SubTitleText>5</SubTitleText>
                </View> 
                <SubTitleText>stops away</SubTitleText>
            </View>
            </ScreenShell>);
        } else { //getting here 
            return (
                <ScreenShell>
                    <TitleText style={{ fontWeight: 'bold' }}>
                        ARRIVED AT LOCATION
                    </TitleText>
                    <SubTitleText>
                        TAP ANYWHERE TO STOP BUZZING
                    </SubTitleText>
                </ScreenShell>
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
  