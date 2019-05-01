import { Location, Permissions } from "expo";
import { Map } from "immutable";

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
export function fetchLocationRequest() {
  return {
    type: ActionTypes.FETCH_LOCATION.REQUEST,
  };
}
export function fetchLocationSuccess({ type, timestamp, longitude, latitude, accuracy }) {
  return {
    type: ActionTypes.FETCH_LOCATION.SUCCESS,
    payload: Map({ type, timestamp, longitude, latitude, accuracy }),
  };
}
export function fetchLocationFailure({ type, timestamp, error }) {
  return {
    type: ActionTypes.FETCH_LOCATION.FAILURE,
    payload: Map({ type, timestamp, error }),
    error: true,
  };
}
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
export function fetchLocation() {
  return async dispatch => {
    dispatch(fetchLocationRequest());
    const { status } = await Permissions.askAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      dispatch(fetchLocationFailure({
        type: 'static',
        timestamp: Date.now(),
        error: `Permission not granted, status was: ${status}`,
      }));
    } else {
      const { timestamp, coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation,
      });
      dispatch(fetchLocationSuccess({ type: 'static', timestamp, ...coords }));
    }
  };
}

let watchLocationSubscription;

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
      if (!watchLocationSubscription) {
        watchLocationSubscription = Location.watchPositionAsync(
          { accuracy: Location.Accuracy.BestForNavigation },
          ({ timestamp, coords }) =>
            dispatch(fetchLocationSuccess({ type: 'dynamic', timestamp, ...coords }))
        );
      }
      dispatch(watchLocationStart());
    }
  };
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