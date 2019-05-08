import Axios from "axios";
import { getUrl, apiKey, maxAttempts } from "./oneBusAway";
import { ActionTypes } from "./types";
import { Map } from "immutable";

// Simple Action Creators
function tripFetchSuccess(payload) {
  return {
    type: ActionTypes.TRIP.FETCH.SUCCESS,
    payload,
  };
}
function tripFetchFailure(error) {
  return {
    type: ActionTypes.TRIP.FETCH.FAILURE,
    payload: error,
    error: true,
  }
}

// Complex Action Creators
export function fetchTrip(stopId, routeId) {
  return async dispatch => {
    let data = {};
    let attempts = 0;
    while (attempts <= maxAttempts && (typeof data !== typeof {} || !data.data)) {
      const response = await Axios.get(
        getUrl(`arrivals-and-departures-for-stop/${stopId}`),
        { params: { key: apiKey, minutesBefore: 0, minutesAfter: 60 } }
      );
      attempts++;
      data = response.data;
    }
    data = data.data;
    const and = data.entry.arrivalsAndDepartures.reduce(
      (acc, and) => acc.routeId === routeId ? acc : and
    );
    if (and.routeId === routeId) {
      dispatch(tripFetchSuccess(Map(and)));
    } else {
      dispatch(tripFetchFailure('No buses of this route are arriving at this stop in the next 60 minutes'));
    }
  }
}
