import { Map, List } from "immutable";
import { ActionTypes } from "../actions";
/* {
  ...
  "70": {
    "agencyId": "1",
    "color": "",
    "description": "University District - Eastlake - Downtown Seattle",
    "id": "1_100264",
    "longName": "",
    "shortName": "70",
    "textColor": "",
    "type": 3,
    "url": "http://metro.kingcounty.gov/schedules/070/n0.html",
  },
  ...
} */
export function routes(state = List([]), action) {
  switch (action.type) {
    case ActionTypes.ROUTE.FETCH_ALL.SUCCESS:
      return action.payload;
    default:
      return state;
  }
}