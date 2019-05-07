import { Map } from 'immutable';
import { ActionTypes } from '../actions';

export function selection(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.ROUTE.SELECT:
      return state.set('route', action.payload);
    default:
      return state;
  }
}