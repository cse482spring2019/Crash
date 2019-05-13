import Axios from "axios";
import { getUrl, apiKey, maxAttempts } from "./oneBusAway";
import { ActionTypes } from "./types";
import { fromJS, Map } from "immutable";

// Simple Action Creators
function tripFetchSuccess(id, trip) {
  return {
    type: ActionTypes.TRIP.FETCH.SUCCESS,
    payload: Map({ id, trip }),
  };
}
function tripFetchFailure(id, error) {
  return {
    type: ActionTypes.TRIP.FETCH.FAILURE,
    payload: Map({ id, error }),
    error: true,
  }
}
function tripWatchStart(id, sub) {
  return {
    type: ActionTypes.TRIP.WATCH.START,
    payload: Map({ id, sub }),
  };
}
export function tripWatchStop(id) {
  return {
    type: ActionTypes.TRIP.WATCH.STOP,
    payload: id,
  };
}

// Complex Action Creators
export function fetchTrip(id, stopId, routeId) {
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
    if (typeof data !== typeof {} || !data.data) dispatch(tripFetchFailure(id, 'Failed to fetch data'));
    else {
      data = data.data;
      const and = data.entry.arrivalsAndDepartures.reduce(
        (acc, and) => acc.routeId === routeId ? acc : and
      );
      if (and.routeId === routeId) {
        dispatch(tripFetchSuccess(id, fromJS(and)));
      } else {
        dispatch(tripFetchFailure(id, 'No buses of this route are arriving at this stop in the next 60 minutes'));
      }
    }
  }
}

class TripWatcher {
  secondsInterval = 1;

  constructor(id, dispatch, trip) {
    this.active = true;
    this.id = id;
    this.dispatch = dispatch;
    this.stopId = trip.get('stopId');
    this.tripId = trip.get('tripId');
    this.serviceDate = trip.get('serviceDate');
    this.vehicleId = trip.get('vehicleId');
    this.stopSequence = trip.get('stopSequence');
    this.fire();
  }

  async fire() {
    if (this.active) {
      const { stopId, tripId, serviceDate, vehicleId, stopSequence } = this;
      let data = {};
      let attempts = 0;
      while (attempts <= maxAttempts && (typeof data !== typeof {} || !data.data)) {
        const response = await Axios.get(
          getUrl(`arrival-and-departure-for-stop/${stopId}`),
          {
            params: Object.assign(
              { key: apiKey, tripId, serviceDate, stopSequence },
              vehicleId ? { vehicleId } : {}
            ),
          }
        );
        attempts++;
        data = response.data;
      }

      if (typeof data === typeof {} && data.data) {
        data = data.data.entry;
        this.dispatch(tripFetchSuccess(this.id, fromJS(data)));
      }

      setTimeout(() => this.fire(), this.secondsInterval * 1000);
    }
  }

  cancel() {
    this.active = false;
  }
}

export function watchTrip(id, trip) {
  return dispatch => {
    dispatch(tripWatchStart(id, new TripWatcher(id, dispatch, trip)));
  };
}