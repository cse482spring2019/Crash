import React from 'react';
import SelectScreenShell from '../components/shell/SelectScreenShell';
import NearestStops, { getNearestStops } from '../components/misc/OBAPickerWrappers/NearestStops';
import AllStops from '../components/misc/OBAPickerWrappers/AllStops';
export default class InitialStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { geo: true };
    props.fetchLocation();
  }

  selectStop(id) {
    const { navigation, selectedDirection, selectInitialStop, stops } = this.props;
    selectInitialStop(
      stops
        .getIn([selectedDirection, 'stops'])
        .findIndex(value => value.get('id') === id)
    );
    navigation.navigate('FinalStopSelect');
  }

  render() {
    return (
      <SelectScreenShell titleText="SELECT ORIGIN STOP">
        {
          this.props.location.get('error') || !this.state.geo
            ? <AllStops
              accessibilityLiveRegion="polite"
              onSelect={id => this.selectStop(id)}
              {...this.props}
            />
            : <NearestStops
              accessibilityLiveRegion="polite"
              onSelect={id => {
                if (id === 'none') {
                  this.setState({ geo: false });
                } else {
                  this.selectStop(id);
                }
              }}
              {...this.props}
            />
        }
      </SelectScreenShell>
    );
  }
}
