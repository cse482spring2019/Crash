import { Location, Permissions } from "expo";
import { Map } from "immutable";

// Action Types
export const REQUEST_LOCATION = 'REQUEST_LOCATION';
export const RECEIVE_LOCATION = 'RECEIVE_LOCATION';
export const FETCH_LOCATION_REQUEST = 'FETCH_LOCATION_REQUEST';
export const FETCH_LOCATION_FAILURE = 'FETCH_LOCATION_FAILURE';
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS';

// Action Creators
export function requestLocation() {
  return {
    type: REQUEST_LOCATION,
  };
}
export function receiveLocation({ timestamp, longitude, latitude }) {
  return {
    type: RECEIVE_LOCATION,
    payload: Map({ timestamp, longitude, latitude }),
  };
}

export function fetchLocation() {
  return function (dispatch) {
    dispatch(requestLocation());

    Permissions.askAsync(Permissions.LOCATION).then(
      ({ status }) => {
        if (status !== 'granted') {
          console.warn('Permission to access location was denied.');
          return Promise.reject(status);
        } else {
          return Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });
        }
      },
      (err) => console.error(err)
    ).then(
      ({ timestamp, coords }) => {
        dispatch(receiveLocation({ timestamp, ...coords }));
      },
      (err) => console.error(`Status was ${JSON.stringify(err)}`)
    );
  };
}