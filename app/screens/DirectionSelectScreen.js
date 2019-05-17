import React from 'react';
import InputScreenShell from '../components/shell/InputScreenShell';
import AllDirections from '../components/misc/OBAPickerWrappers/AllDirections';

export default class InitialStopSelectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedDir: '' };
  }

  clickNext = () => {
    const { selectDirection, stops } = this.props;

    if (this.state.selectedDir !== '') {
      selectDirection(
        stops.findIndex(value => value.get('groupId') === this.state.selectedDir)
      );
      this.props.navigation.navigate('InitialStopSelect');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="SELECT DIRECTION"
        subTitleText="and press next to continue"
        clickNext={this.clickNext}
      >
        <AllDirections
          selected={this.state.selectedDir}
          onSelect={(id) => this.setState({ selectedDir: id })}
          {...this.props}
        />
      </InputScreenShell>
    );
  }
}
