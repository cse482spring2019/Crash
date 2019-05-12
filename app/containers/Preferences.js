import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    buzzList: state.getIn(['selection', 'buzzList']),
    ...ownProps,
  };
};
export const Preferences = connect(mapStateToProps);