// Library Imports
import { combineReducers } from 'redux-immutable';

// Local imports
import { location } from './location';
import { routes } from './routes';
import { selection } from './selection';
import { stops } from './stop';

export default rootReducer = combineReducers({ location, routes, selection, stops });
