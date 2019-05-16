import React from 'react';
import { ScrollView, StyleSheet, Picker } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import DirectionView from '../components/DirectionView';

const DirView = Trip(Preferences(Stops(Routes(Location(DirectionView)))));


export default class DirectionInputScreen extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         Direction: 'stop1'
       }
     }


  render() {
    return (
        <Picker style={{height: 300, width: 400}} selectedValue={this.state.Direction} onValueChange={(dir) => this.setState({Direction: dir})} >
              <Picker.Item label="Northgate TC to University District to Children’s Hospital" value="stop1" />
              <Picker.Item label="Children’s Hospital to University District to Northgate TC" value="js" />
        </Picker>
    );
  }
}
