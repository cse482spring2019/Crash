import Axios from "axios";
import { Map, List } from "immutable";
import { ActionTypes } from "./types";
import { apiKey, getUrl, maxAttempts } from "./oneBusAway";

// Simple Action Creators
function stopFetchAllSuccess(stopsByDirection) {
  return {
    type: ActionTypes.STOP.FETCH_ALL.SUCCESS,
    payload: stopsByDirection,
  };
}
export function stopSelectInitial(idx) {
  return {
    type: ActionTypes.STOP.SELECT.INITIAL,
    payload: idx,
  };
}
export function stopSelectFinal(idx) {
  return {
    type: ActionTypes.STOP.SELECT.FINAL,
    payload: idx,
  }
}

// Complex Action Creators
export function fetchStops(routeId) {
  return async dispatch => {
    let data = {};
    let attempts = 0;
    while (attempts <= maxAttempts && (typeof data !== typeof {} || !data.data)) {
      const response = await Axios.get(
        getUrl(`stops-for-route/${routeId}`),
        { params: { key: apiKey } }
      );
      attempts++;
      data = response.data;
    }
    data = data.data;
    if (data) {
      const stops = data.references.stops.reduce(
        (acc, stop) => acc.set(stop.id, Map(stop)),
        Map({})
      );
      const byDirection = data.entry.stopGroupings[0].stopGroups.reduce(
        (acc, group) => acc.push(Map({
          groupId: group.id,
          direction: group.name.names[0],
          stops: List(group.stopIds.map(id => stops.get(id))),
        })),
        List([])
      );
      dispatch(stopFetchAllSuccess(byDirection));
    }
  };
}
