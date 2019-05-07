import { Map } from "immutable";
import { ActionTypes } from "../actions";

/*
{
  "0": {
    "direction": "Redmond",
    "stops": [
      ...
      {
        "id": "1_36960",
        "code": "36960",
        "name": "NE 65th St & Oswego Pl NE",
        "direction": "W",
        "lat": 47.67593,
        "lon": -122.321167,
        "locationType": 0,
        "routeIds": Array [
          "1_100225",
          "1_100252",
          "1_102639",
          "1_100253",
          "1_100270",
          "40_100511",
        ],
        "wheelchairBoarding": "UNKNOWN",
      },
      ...
    ],
  }
}
*/
export function stops(state = Map({}), action) {
  switch (action.type) {
    case ActionTypes.STOP.FETCH_ALL.SUCCESS:
      return state.merge(action.payload);
    default:
      return state;
  }
}