import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { WebBrowser } from 'expo';
// import { withStyles } from '@material-ui/core/styles';
import { Button } from 'react-native-material-ui';

import { MonoText } from '../components/StyledText';
import GeoLocatorView from '../components/GeoLocatorView';
import { Location, Routes, Stops, Preferences, Trip } from '../containers';

const LocationView = Trip(Preferences(Stops(Routes(Location(GeoLocatorView)))));
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // busToDisplay: this.props.selection.get('route')
      busToDisplay: "271",
      myColor: "blue"
    };
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              🦏🦏🦏🦏🦏🦏🦏🦏🦏🦏
            </Text>
          </View>

          <LocationView watchLocation tripKey="testLocation" />
        </ScrollView>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
        tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F7B733',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  text: {
    fontSize: 390,
    color: '#ffffff',
    // marginLeft: 95,
  },
  confirmationText: {
    fontSize: 34,
    color: '#ffffff',
    marginBottom: -70,
    marginLeft: 30,

  },
  button: {
    alignItems: 'center',
    backgroundColor: '#4A78BD',
    padding: 5,
    width: 50,
    flexGrow: 1,
    // flexBasis: 200,
    // height: 165,
  },
  buttonNo: {
    alignItems: 'center',
    backgroundColor: '#FC4A1A',
    padding: 5,
    width: 50,
    flexGrow: 1,
    // flexBasis: 200,
    // height: 165,
  },
  buttonText: {
    color: "#fff",
    fontSize: 30,
  },
});
