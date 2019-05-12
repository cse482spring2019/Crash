import React from 'react';
import { Text, View } from 'react-native';

export default class GetBusNumber extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (this.props.routes.size === 0 && nextProps.routes.size > 0) {
          this.props.selectRoute(nextProps.routes.get('542'));
        }
      }  
    
}