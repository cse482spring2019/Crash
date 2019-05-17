import React from 'react';
import { Alert, StyleSheet, TextInput, Text } from 'react-native';
import InputScreenShell from '../components/shell/InputScreenShell';


export default class ChooseRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routeNum: '' };
  }

  clickNext = () => {
    const route = this.props.routes.get(this.state.routeNum);
    if (route) {
      this.props.selectRoute(route);
      this.props.navigation.navigate('DirectionSelect');
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="ENTER BUS NUMBER"
        subTitleText="and press next to continue"
        clickNext={this.clickNext}>
        <TextInput
          style={styles.input}
          onChangeText={(routeNum) => this.setState({ routeNum })}
          value={this.state.routeNum}
        />
      </InputScreenShell>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    backgroundColor: 'white',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 60,
    borderRadius: 20,
    textAlign: 'center',
  },
});