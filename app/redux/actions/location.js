import { Location, Permissions } from 'expo';
import { Map } from 'immutable';
import { ActionTypes } from './types';

// Simple Action Creators
function locationFetchSuccess({ type, timestamp, longitude, latitude, accuracy }) {
  return {
    type: ActionTypes.LOCATION.FETCH.SUCCESS,
    payload: Map({
      type,
      timestamp,
      coords: Map({ longitude, latitude, accuracy }),
    }),
  };
}
function locationFetchFailure({ type, timestamp, error }) {
  return {
    type: ActionTypes.LOCATION.FETCH.FAILURE,
    payload: Map({ type, timestamp, error }),
    error: true,
  };
}
function locationWatchStart() {
  return {
    type: ActionTypes.LOCATION.WATCH.START
  };
}
function locationWatchStop() {
  return {
    type: ActionTypes.LOCATION.WATCH.STOP,
  };
}

// Complex Action Creators
export function fetchLocation() {
  return async dispatch => {
    try {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== 'granted') {
        dispatch(locationFetchFailure({
          type: 'static',
          timestamp: Date.now(),
          error: `Location permission not granted, status was: ${status}`,
        }));
      } else {
        const { timestamp, coords } = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.BestForNavigation,
        });
        dispatch(locationFetchSuccess({ type: 'static', timestamp, ...coords }));
      }
    } catch (e) {
      dispatch(locationFetchFailure({
        type: 'static',
        timestamp: Date.now(),
        error: `Failed to fetch location, location services may be disabled`,
      }));
    }
  };
}

let watchLocationSubscription;

export function watchLocation() {
  return async dispatch => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      dispatch(
        locationFetchFailure({
          type: 'dynamic',
          timestamp: Date.now(),
          error: `Location permission not granted, status was: ${status}`,
        })
      );
    } else {
      dispatch(locationWatchStart());
      if (!watchLocationSubscription) {
        watchLocationSubscription =
          Location.watchPositionAsync(
            { accuracy: Location.Accuracy.BestForNavigation },
            ({ timestamp, coords }) =>
              dispatch(locationFetchSuccess({ type: 'dynamic', timestamp, ...coords }))
          );
      }
    }
  };
}

export function stopWatchLocation() {
  return dispatch => {
    if (watchLocationSubscription) {
      watchLocationSubscription.remove();
      watchLocationSubscription = null;
    }
    dispatch(locationWatchStop());
  }
}