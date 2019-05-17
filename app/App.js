// Library imports
import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { useScreens } from 'react-native-screens';
import { AppLoading, Font } from 'expo';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

// Local imports
import AppNavigator from './navigation/AppNavigator';
import rootReducer from './redux/reducers';
import { fetchRoutes, fetchSavedBuzzPatterns } from './redux/actions';

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
  };

  componentWillMount() {
    store.dispatch(fetchSavedBuzzPatterns());
    store.dispatch(fetchRoutes());
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
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
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
