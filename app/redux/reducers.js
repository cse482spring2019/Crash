// Library Imports
import { combineReducers } from "redux-immutable";
import { Map } from "immutable";

// Local imports
import { ActionTypes } from "./actions";

function setLocation({ state, timestamp, error, coords }) {
  return state.withMutations(
    mutable =>
      mutable
        .set('timestamp', timestamp)
        .set('error', error)
        .set('coords', coords)
  );
}

function location_static(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.FETCH_LOCATION.REQUEST:
      return state.set('isFetching', true);
    case ActionTypes.FETCH_LOCATION.SUCCESS:
      var payload = action.payload;
      if (action.payload.get('type') === 'static') {
        return setLocation({
          state: state.set('isFetching', false),
          timestamp: payload.get('timestamp'),
          coords: Map({
            longitude: payload.get('longitude'),
            latitude: payload.get('latitude'),
            accuracy: payload.get('accuracy'),
          }),
        });
      }
    case ActionTypes.FETCH_LOCATION.FAILURE:
      payload = action.payload;
      if (payload.get('type') === 'static') {
        return setLocation({
          state: state.set('isFetching', false),
          timestamp: payload.get('timestamp'),
          error: payload.get('error'),
        });
      }
    default:
      return state;
  }
}
function location_dynamic(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.FETCH_LOCATION.SUCCESS:
      var payload = action.payload;
      if (payload.get('type') === 'dynamic') {
        return setLocation({
          state,
          timestamp: payload.get('timestamp'),
          coords: Map({
            longitude: payload.get('longitude'),
            latitude: payload.get('latitude'),
            accuracy: payload.get('accuracy'),
          }),
        });
      }
    case ActionTypes.FETCH_LOCATION.FAILURE:
      payload = action.payload;
      if (payload.get('type') === 'dynamic') {
        return setLocation({
          state,
          timestamp: payload.get('timestamp'),
          error: payload.get('error'),
        });
      }
    case ActionTypes.WATCH_LOCATION.START:
      return state.set('isWatching', true);
    case ActionTypes.WATCH_LOCATION.STOP:
      return state.set('isWatching', false);
    default:
      return state;
  }
}
const location = combineReducers({
  static: location_static,
  dynamic: location_dynamic
});
export default rootReducer = combineReducers({ location });
