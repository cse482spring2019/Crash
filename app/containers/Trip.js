import { connect } from 'react-redux';
import { fetchTrip, watchTrip, tripWatchStop } from '../redux/actions';

const mapStateToProps = (state, ownProps) => {
  const trip = state.getIn(['selection', 'trip', ownProps.tripKey]);
  return Object.assign(
    {
      ...ownProps,
    },
    trip
      ? (
        trip.get('error')
          ? { activeTripError: trip.get('payload') }
          : { activeTrip: trip.get('payload') }
      )
      : {}
  );
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return ownProps.tripKey ? {
    fetchTrip: (sid, rid) => dispatch(fetchTrip(ownProps.tripKey, sid, rid)),
    watchTrip: (trip) => dispatch(watchTrip(ownProps.tripKey, trip)),
    stopWatchTrip: () => dispatch(tripWatchStop(ownProps.tripKey)),
  } : {};
};
export const Trip = connect(mapStateToProps, mapDispatchToProps);
