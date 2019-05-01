// Library imports
import { connect } from "react-redux";

// Local imports
import { fetchLocation } from "../redux/actions";

const mapStateToProps = (state, ownProps) => {
  if (ownProps.watchLocation) {
    return {
      location: state.get('location').get('dynamic'),
    };
  } else {
    return {
      location: state.get('location').get('static'),
    };
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchLocation: () => dispatch(fetchLocation())
  };
}
export default GeoLocator = (component) => connect(mapStateToProps, mapDispatchToProps)(component);
