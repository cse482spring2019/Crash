// Library imports
import { connect } from "react-redux";

// Local imports
import { fetchLocation } from "../redux/actions";

const mapStateToProps = (state, ownProps) => {
  return {
    location:
      state
        .get('location')
        .get(ownProps.watchLocation ? 'dynamic' : 'static'),
    ...ownProps,
  };
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return ownProps.watchLocation ? {} : {
    fetchLocation: () => dispatch(fetchLocation())
  };
}
export default GeoLocator = connect(mapStateToProps, mapDispatchToProps);
