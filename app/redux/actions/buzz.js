import { fromJS } from 'immutable';
import { AsyncStorage } from 'react-native';
import { ActionTypes } from './types';

// Simple Action Creators
function buzzFetchSavedPatternsSuccess(payload) {
  return {
    type: ActionTypes.BUZZ.FETCH_SAVED_PATTERNS.SUCCESS,
    payload,
  };
}

// Complex Action Creators
export function fetchSavedBuzzPatterns() {
  return async dispatch => {
    const patterns = await AsyncStorage.getItem('BUZZ_PATTERNS');
    if (patterns) {
      dispatch(buzzFetchSavedPatternsSuccess(fromJS(patterns)));
    }
  };
}
