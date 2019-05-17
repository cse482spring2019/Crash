import React from 'react';
import InputScreenShell from '../components/shell/InputScreenShell';
import { TextInput, Text } from 'react-native';
// import { selectRoute } from '../redux/actions';


export default class ChooseRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedStop: '', geo: true, routeNum: '' };
  }

  componentWillReceiveProps(nextProps) {
    const {
      selectRoute,
      routes
    } = this.props;

    if (routes.size > 0) {
      selectRoute(routes.get(this.state.routeNum));
    }
  }

  clickNext = () => {
    if (this.state.routeNum != '') {
      this.props.navigation.navigate('DirectionSelect');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="ENTER BUS NUMBER"
        subTitleText={
          "and press next to continue"
        }

        clickNext={this.clickNext}>

        <TextInput
          style={{
            fontSize: 60, height: 100, borderColor: 'white', backgroundColor: 'white',
            borderRadius: 20, textAlign: 'center',
          }}
          onChangeText={(routeNum) => this.setState({ routeNum })}
          value={this.state.routeNum}
        />

      </InputScreenShell>
    );
  }
}
