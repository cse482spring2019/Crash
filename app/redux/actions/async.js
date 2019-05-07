// Library imports
import { Location, Permissions } from 'expo';

// Local imports
import {
  fetchLocationRequest, fetchLocationFailure, fetchLocationSuccess, watchLocationStart,
  getLocationSubscription, setLocationSubscription
} from './sync';

// FetchLocation
export function fetchLocation() {
  return async dispatch => {
    dispatch(fetchLocationRequest());

    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(fetchLocationFailure({
        type: 'static',
        timestamp: Date.now(),
        error: `Location permission not granted, status was: ${status}`,
      }));
    } else {
      const { timestamp, coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      dispatch(fetchLocationSuccess({ type: 'static', timestamp, ...coords }));
    }
  };
}
// WatchLocation
export function watchLocation() {
  return async dispatch => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(
        fetchLocationFailure({
          type: 'dynamic',
          timestamp: Date.now(),
          error: `Location permission not granted, status was: ${status}`,
        })
      );
    } else {
      dispatch(watchLocationStart());
      if (!getLocationSubscription()) {
        setLocationSubscription(Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation },
          ({ timestamp, coords }) =>
            dispatch(fetchLocationSuccess({ type: 'dynamic', timestamp, ...coords }))
        ));
      }
    }
  };
}
