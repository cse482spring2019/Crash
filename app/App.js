// Library imports
import React from 'react';
import { NetInfo, StatusBar, StyleSheet, View } from 'react-native';
import { useScreens } from 'react-native-screens';
import { AppLoading, Font, KeepAwake, ScreenOrientation } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// Local imports
import AppNavigator from './navigation/AppNavigator';
import rootReducer from './redux/reducers';
import { fetchRoutes, fetchSavedBuzzPatterns } from './redux/actions';
import NoConnectionScreen from './screens/NoConnectionScreen';

useScreens();

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
  )
);

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    connected: false,
  };

  componentWillMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    store.dispatch(fetchSavedBuzzPatterns());
    store.dispatch(fetchRoutes());
    NetInfo.addEventListener(
      'connectionChange',
      (info) => {
        if (info.type === 'none' || info.type === 'unknown') {
          this.setState({ connected: false });
        } else {
          this.setState({ connected: true });
        }
      }
    );
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            <StatusBar hidden />
            <KeepAwake />
            {
              this.state.connected
                ? <AppNavigator />
                : <NoConnectionScreen />
            }
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'RobotoBold': require('./assets/fonts/Roboto-Bold.ttf'),
      'RobotoMono': require('./assets/fonts/RobotoMono-Bold.ttf'),
    });
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
