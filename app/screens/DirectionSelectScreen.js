import React from 'react';
import SelectScreenShell from '../components/shell/SelectScreenShell';
import AllDirections from '../components/misc/OBAPickerWrappers/AllDirections';

export default class InitialStopSelectScreen extends React.Component {
  render() {
    return (
      <SelectScreenShell titleText="SELECT DIRECTION">
        <AllDirections
          onSelect={id => {
            const { navigation, selectDirection, stops } = this.props;
            selectDirection(stops.findIndex(value => value.get('groupId') === id));
            navigation.navigate('InitialStopSelect');
          }}
          {...this.props}
        />
      </SelectScreenShell>
    );
  }
}
