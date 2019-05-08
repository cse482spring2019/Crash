export const ActionTypes = {
  LOCATION: {
    FETCH: {
      SUCCESS: 'LOCATION_FETCH_SUCCESS',
      FAILURE: 'LOCATION_FETCH_FAILURE',
    },
    WATCH: {
      START: 'LOCATION_WATCH_START',
      STOP: 'LOCATION_WATCH_STOP',
    },
  },
  ROUTE: {
    FETCH_ALL: {
      SUCCESS: 'ROUTE_FETCH_ALL_SUCCESS',
    },
    SELECT: 'ROUTE_SELECT',
  },
  STOP: {
    FETCH_ALL: {
      SUCCESS: 'FETCH_STOPS_SUCCESS',
    },
  },
  TRIP: {
    FETCH: {
      SUCCESS: 'FETCH_TRIP_SUCCESS',
      FAILURE: 'FETCH_TRIP_FAILURE',
    },
  },
  BUZZ: {
    FETCH_SAVED_PATTERNS: {
      SUCCESS: 'BUZZ_FETCH_SAVED_PATTERNS_SUCCESS',
    },
  },
};