// Library imports
import { connect } from 'react-redux';

// Local imports
import { selectRoute } from '../redux/actions';

const mapStateToProps = (state, ownProps) => {
  return {
    selectedRoute: state.getIn(['selection', 'route']),
    routes: state.get('routes'),
    ...ownProps,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    selectRoute: route => dispatch(selectRoute(route)),
  };
};
export const Routes = connect(mapStateToProps, mapDispatchToProps);