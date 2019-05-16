import React from 'react';
import InputScreenShell from '../components/shell/InputScreenShell';
import NearestStops from '../components/misc/OBAPickerWrappers/NearestStops';
import AllStops from '../components/misc/OBAPickerWrappers/AllStops';
export default class InitialStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedStop: '', geo: true };
  }

  componentWillMount() {
    const { fetchLocation } = this.props;
    fetchLocation();
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
      this.props.navigation.navigate('FinalStopSelect');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="SELECT ORIGIN STOP"
        subTitleText={
          this.props.location.get('error') || !this.state.geo
            ? 'and press next to continue'
            : 'are you at...?'
        }
        clickNext={this.clickNext}
      >
        {
          this.props.location.get('error') || !this.state.geo
            ? <AllStops
              selected={this.state.selectedStop}
              onSelect={(id) => this.setState({ selectedStop: id })}
              {...this.props}
            />
            : <NearestStops
              selected={this.state.selectedStop}
              onSelect={(id) => this.setState({ selectedStop: id })}
              {...this.props}
            />
        }
      </InputScreenShell>
    );
  }
}
