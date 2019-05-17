import React from 'react';
import InputScreenShell from '../components/shell/InputScreenShell';
import FinalStops from '../components/misc/OBAPickerWrappers/FinalStops';

export default class FinalStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStop: props.stops.getIn([
        props.selectedDirection,
        'stops',
        props.selectedInitialStop + 1,
        'id'
      ])
    };
  }

  clickNext = () => {
    const { selectedDirection, selectFinalStop, stops } = this.props;
    if (this.state.selectedStop !== '') {
      selectFinalStop(
        stops
          .getIn([selectedDirection, 'stops'])
          .findIndex(value => value.get('id') === this.state.selectedStop)
      );
      this.props.navigation.navigate('WaitForBus');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="SELECT FINAL STOP"
        subTitleText="and press done when finished"
        nextButtonText="DONE"
        clickNext={this.clickNext}
      >
        <FinalStops
          selected={this.state.selectedStop}
          onSelect={id => this.setState({ selectedStop: id })}
          {...this.props}
        />
      </InputScreenShell>
    );
  }
}
