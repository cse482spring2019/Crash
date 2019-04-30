// Library imports
import { connect } from "react-redux";

// Local imports
import { fetchLocation } from "../redux/actions";
import GeoLocatorView from "../components/GeoLocatorView";

const mapStateToProps = state => {
  return {
    location: state.get('location').toObject()
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchLocation: () => dispatch(fetchLocation())
  };
}
export default GeoLocator = connect(mapStateToProps, mapDispatchToProps)(GeoLocatorView);