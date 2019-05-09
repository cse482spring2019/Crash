import { connect } from 'react-redux';
import { fetchTrip } from '../redux/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchTrip: (sid, rid) => dispatch(fetchTrip(sid, rid)),
  };
};
export const Trip = connect(mapStateToProps, mapDispatchToProps);
