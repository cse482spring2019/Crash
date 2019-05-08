import Axios from "axios";
import { Map, List } from "immutable";
import { ActionTypes } from "./types";
import { apiKey, getUrl } from "./oneBusAway";

// Simple Action Creators
function stopFetchAllSuccess(stopsByDirection) {
  return {
    type: ActionTypes.STOP.FETCH_ALL.SUCCESS,
    payload: stopsByDirection,
  };
}

// Complex Action Creators
export function fetchStops(routeId) {
  return async dispatch => {
    const response = await Axios.get(getUrl(`stops-for-route/${routeId}`), { params: { key: apiKey } });
    const data = response.data.data;
    const stops = data.references.stops.reduce(
      (acc, stop) => acc.set(stop.id, Map(stop)),
      Map({})
    );
    const byDirection = data.entry.stopGroupings[0].stopGroups.reduce(
      (acc, group) => acc.set(group.id, Map({
        direction: group.name.names[0],
        stops: List(group.stopIds.map(id => stops.get(id))),
      })),
      Map({})
    );
    dispatch(stopFetchAllSuccess(byDirection));
  };
}
