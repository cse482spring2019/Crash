import React from 'react';
import InputScreenShell from '../components/shell/InputScreenShell';
import FinalStops from '../components/FinalStops';
export default class FinalStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedStop: '', geo: true };
  }

  componentWillMount() {
    const { fetchLocation, selectDirection, selectedDirection, selectRoute, stops, routes } = this.props;
    fetchLocation();
    if (selectedDirection === undefined && stops.get(0)) {
      selectDirection(0);
    } else if (routes.size > 0) {
      selectRoute(routes.get('542'));
    }
  }

  componentDidUpdate(prevProps) {
    const { pStops, pRoutes } = prevProps;
    const { selectRoute, selectDirection, stops, routes } = this.props;
    if ((!pRoutes || pRoutes.size === 0) && routes.size > 0) {
      selectRoute(routes.get('542'));
    }
    if ((!pStops || !pStops.get(0)) && stops.get(0)) {
      selectDirection(0);
    }
  }

  clickNext = () => {
    const { selectedDirection, selectInitialStop, stops } = this.props;

    if (this.state.selectedStop === '' || this.state.selectedStop === 'none') {
      this.setState({ geo: false });
    } else {
      selectInitialStop(
        stops
          .getIn([selectedDirection, 'stops'])
          .findIndex(value => value.get('id') === this.state.selectedStop)
      );
     // this.props.navigation.navigate('FinalStopSelect');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="SELECT FINAL STOP"
        subTitleText={
          this.props.location.get('error') || !this.state.geo
            ? 'and press next to continue'
            : 'are you at...?'
        }
        clickNext={this.clickNext}
      >
        {
           <FinalStops
              selected={this.state.selectedStop}
              onSelect={(id) => this.setState({ selectedStop: id })}
              {...this.props}
            />

        }
      </InputScreenShell>
    );
  }
}
