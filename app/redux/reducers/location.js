// Library imports
import { Map } from "immutable";
import { combineReducers } from "redux-immutable";

// Local imports
import { ActionTypes } from "../actions";
import * as mutate from "./mutators";
import { pipe } from "./utils";


const setTimestampErrorCoords =
  p => [mutate.setTimestamp, mutate.setError, mutate.setCoords].map(fn => fn(p));

function location_static(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.FETCH_LOCATION.REQUEST:
      return mutate.startFetching(state);
    case ActionTypes.FETCH_LOCATION.SUCCESS:
    case ActionTypes.FETCH_LOCATION.FAILURE:
      if (action.payload.get('type') === 'static') {
        return pipe([
          mutate.stopFetching,
          ...setTimestampErrorCoords(action.payload),
        ], state);
      }
    default:
      return state;
  }
}
function location_dynamic(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.WATCH_LOCATION.START:
      return mutate.startWatching(state);
    case ActionTypes.WATCH_LOCATION.STOP:
      return mutate.stopWatching(state);
    case ActionTypes.FETCH_LOCATION.SUCCESS:
    case ActionTypes.FETCH_LOCATION.FAILURE:
      if (action.payload.get('type') === 'dynamic') {
        return pipe([
          ...setTimestampErrorCoords(action.payload),
        ], state);
      }
    default:
      return state;
  }
}
export const location = combineReducers({
  static: location_static,
  dynamic: location_dynamic
});
