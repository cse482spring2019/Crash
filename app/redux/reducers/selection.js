import { Map, fromJS } from 'immutable';
import { ActionTypes } from '../actions';
import { config } from '../../config';
/*
{
  buzzList: [
    ...
    {
      "unit": "stop",
      "value": 0,
      "buzz": {
        "repeat": true,
        "pattern": [300],
      },
    },
    ...
  ],
  route: {
    ...
    "agencyId": "1",
    "description": "University District - Eastlake - Downtown Seattle",
    "id": "1_100264",
    "longName": "",
    "shortName": "70",
    ...
  },
  direction: "0",
  initialStop: 4,
  finalStop: 7,
  trip: {
    error: boolean
    payload: string if error, else {
      ...
      "distanceFromStop": 5641.739513781853,
      "numberOfStopsAway": 7,
      "routeId": "1_102548",
      "serviceDate": 1557212400000,
      "stopSequence": 12,
      "totalStopsInTrip": 24,
      "scheduledArrivalTime": 1557267720000,
      "predicted": false,
      "predictedArrivalTime": 0,
      ...
    },
  },
}
*/
const initialState = Map({ buzzList: fromJS(config.buzzDefaults) });
export function selection(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.BUZZ.FETCH_SAVED_PATTERNS.SUCCESS:
      return state.set('buzzList', action.payload);
    case ActionTypes.ROUTE.SELECT:
      return state.set('route', action.payload);
    case ActionTypes.ROUTE.DIRECTION.SELECT:
      return state.set('direction', action.payload);
    case ActionTypes.STOP.SELECT.INITIAL:
      return state.set('initialStop', action.payload);
    case ActionTypes.STOP.SELECT.FINAL:
      return state.set('finalStop', action.payload);
    case ActionTypes.TRIP.FETCH.SUCCESS:
      return state.withMutations(mutable =>
        mutable
          .setIn(['trip', 'payload'], action.payload)
          .setIn(['trip', 'error'], false)
      );
    case ActionTypes.TRIP.FETCH.FAILURE:
      return state.withMutations(mutable =>
        mutable
          .setIn(['trip', 'payload'], action.payload)
          .setIn(['trip', 'error'], true)
      );
    default:
      return state;
  }
}
