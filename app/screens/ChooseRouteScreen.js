import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import InputScreenShell from '../components/shell/InputScreenShell';
import { config } from '../config';

export default class ChooseRouteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { routeNum: '' };
  }

  clickNext = () => {
    const filteredRoutes = this.props.routes.filter(route => {
      return route.get('shortName').toLowerCase() === this.state.routeNum.toLowerCase()
        || route.get('longName').toLowerCase() === this.state.routeNum.toLowerCase()
    });
    if (filteredRoutes.size === 1) {
      this.props.selectRoute(filteredRoutes.get(0));
      this.props.navigation.navigate('DirectionSelect');
    } else if (filteredRoutes.size > 1) {
      this.props.navigation.navigate('ConfirmRoute', { routeNum: this.state.routeNum });
    }
  }

  render() {
    return (
      <InputScreenShell
        titleText="ENTER BUS NUMBER"
        clickNext={this.clickNext}>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          placeholder="EX. 545"
          placeholderTextColor="#ffffff99"
          onEndEditing={this.clickNext}
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
    borderWidth: 1,
    borderColor: config.colors.backgroundText,
    backgroundColor: config.colors.background,
    color: 'white',
    fontFamily: 'RobotoBold',
    fontSize: 65,
    textAlign: 'center',
  },
});