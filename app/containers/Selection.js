import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  return {
    selection: state.get('selection'),
    ...ownProps,
  };
};
export const Selection = connect(mapStateToProps);