// Library imports
import { Map } from 'immutable';

// Action Types
export const ActionTypes = {
  FETCH_LOCATION: {
    REQUEST: 'FETCH_LOCATION_REQUEST',
    SUCCESS: 'FETCH_LOCATION_SUCCESS',
    FAILURE: 'FETCH_LOCATION_FAILURE',
  },
  WATCH_LOCATION: {
    START: 'WATCH_LOCATION_START',
    STOP: 'WATCH_LOCATION_STOP',
  },
};

// Simple Action Creators
/// FetchLocation
export function fetchLocationRequest() {
  return {
    type: ActionTypes.FETCH_LOCATION.REQUEST,
  };
}
export function fetchLocationSuccess({ type, timestamp, longitude, latitude, accuracy }) {
  return {
    type: ActionTypes.FETCH_LOCATION.SUCCESS,
    payload: Map({
      type,
      timestamp,
      coords: Map({ longitude, latitude, accuracy }),
    }),
  };
}
export function fetchLocationFailure({ type, timestamp, error }) {
  return {
    type: ActionTypes.FETCH_LOCATION.FAILURE,
    payload: Map({ type, timestamp, error }),
    error: true,
  };
}
/// WatchLocation
export function watchLocationStart() {
  return {
    type: ActionTypes.WATCH_LOCATION.START
  };
}
export function watchLocationStop() {
  return {
    type: ActionTypes.WATCH_LOCATION.STOP,
  };
}

// Complex Action Creators
let watchLocationSubscription;
export function getLocationSubscription() {
  return watchLocationSubscription;
}
export function setLocationSubscription(subscription) {
  watchLocationSubscription = subscription;
}

export function stopWatchLocation() {
  return dispatch => {
    if (watchLocationSubscription) {
      watchLocationSubscription.remove();
      watchLocationSubscription = null;
    }
    dispatch(watchLocationStop());
  }
}
