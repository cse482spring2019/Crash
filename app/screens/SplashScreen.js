import React from 'react'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

//Makes the default splash screen for navigating to the initial stop screen. 
export default class SplashScreen extends React.Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('InitialStop')}>
                <View style={styles.container}>
                    <Text style={styles.titleText}>
                        TAP ANYWHERE TO BEGIN
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    colorBlue: {
      backgroundColor: '#4A78BD'
    }, 
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#4A78BD'
    },
    titleText: {
        fontSize: 30, 
        fontWeight: 'bold',
        color: 'white'
    },
  });