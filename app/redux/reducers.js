// Library Imports
import { combineReducers } from "redux-immutable";
import { Map } from "immutable";

// Local imports
import { REQUEST_LOCATION, RECEIVE_LOCATION } from "./actions";

function location(state = Map({}), action) {
  switch (action.type) {
    case REQUEST_LOCATION:
      return state.set('isFetching', true);
    case RECEIVE_LOCATION:
      const payload = action.payload;
      return state.merge(Map({
        isFetching: false,
        timestamp: payload.get('timestamp'),
        longitude: payload.get('longitude'),
        latitude: payload.get('latitude'),
      }));
    default:
      return state;
  }
}
export default rootReducer = combineReducers({ location });