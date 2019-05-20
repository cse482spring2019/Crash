import React from 'react';
import SelectScreenShell from '../components/shell/SelectScreenShell';
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
    if (this.state.selectedStop !== '') {
    }
  }

  render() {
    return (
      <SelectScreenShell titleText="SELECT FINAL STOP">
        <FinalStops
          onSelect={id => {
            const { navigation, selectedDirection, selectFinalStop, stops } = this.props;
            selectFinalStop(
              stops
                .getIn([selectedDirection, 'stops'])
                .findIndex(value => value.get('id') === id)
            );
            navigation.navigate('WaitForBus');
          }}
          {...this.props}
        />
      </SelectScreenShell>
    );
  }
}
