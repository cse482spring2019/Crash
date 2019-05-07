import Axios from 'axios';
import { Map } from 'immutable';
import { ActionTypes } from './types';
import { fetchStops } from './stop';
import { getUrl, key } from './oneBusAway';

// Simple Action Creators
function routeFetchAllSuccess(routes) {
  return {
    type: ActionTypes.ROUTE.FETCH_ALL.SUCCESS,
    payload: routes,
  };
}
function routeSelect(route) {
  return {
    type: ActionTypes.ROUTE.SELECT,
    payload: route,
  };
}

// Complex Action Creators
async function getAgencies() {
  const response = await Axios.get(getUrl('agencies-with-coverage'), { params: { key: key } });
  const data = response.data.data;
  return data.references.agencies;
}

async function getRoutesForAgency(id) {
  try {
    let data = {};
    while (!data.data) {
      const response = await Axios.get(getUrl(`routes-for-agency/${id}`), { params: { key: key } });
      data = response.data;
    }
    return data.data.list;
  } catch (err) {
    console.error(err);
  }
}

export function fetchRoutes() {
  return async dispatch => {
    const agencies = (await getAgencies())
      // Filter out non-bus agencies
      .filter(ag => !['96', '95', 'KMD', '23'].includes(ag.id));

    const routes = (await Promise.all(
      agencies.map(async agency => getRoutesForAgency(agency.id))
    )).reduce(
      (acc, routes) => acc.merge(
        routes
          // Filter out non-bus routes
          .filter(route => route.type == 3)
          // Reduce to a map from route name to route details
          .reduce(
            (acc, route) => (acc.set(route.shortName || route.longName, Map(route))),
            Map({})
          )
      ),
      Map({})
    );
    dispatch(routeFetchAllSuccess(routes));
  };
}

export function selectRoute(route) {
  return async dispatch => {
    await dispatch(fetchStops(route.get('id')));
    dispatch(routeSelect(route));
  };
}
