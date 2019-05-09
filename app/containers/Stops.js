import { connect } from 'react-redux';
import { routeDirectionSelect, stopSelectInitial, stopSelectFinal } from '../redux/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    stops: state.get('stops'),
    ...ownProps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectDirection: dir => dispatch(routeDirectionSelect(dir)),
    selectInitialStop: idx => dispatch(stopSelectInitial(idx)),
    selectFinalStop: idx => dispatch(stopSelectFinal(idx)),
  };
};
export const Stops = connect(mapStateToProps, mapDispatchToProps);