// Library imports
import { connect } from "react-redux";

// Local imports
import { fetchLocation, selectRoute } from "../redux/actions";

const mapStateToProps = (state, ownProps) => {;
  return {
    routes: state.get('routes'),
    stops: state.get('stops'),
    selection: state.get('selection'),
    location:
      state
        .get('location')
        .get(ownProps.watchLocation ? 'dynamic' : 'static'),
    ...ownProps,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return Object.assign(
    {
      selectRoute: (route) => dispatch(selectRoute(route)),
    },
    ownProps.watchLocation ? {} : { fetchLocation: () => dispatch(fetchLocation()) }
  );
}
export default GeoLocator = connect(mapStateToProps, mapDispatchToProps);
