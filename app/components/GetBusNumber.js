import React from 'react';
import { Text, View, Alert, StyleSheet} from 'react-native';

export default class GetBusNumber extends React.Component {
    //this will go away once we map screens together 
    componentWillReceiveProps(nextProps) {
        if (this.props.routes.size === 0 && nextProps.routes.size > 0) {
            let route = nextProps.routes.get('67');
            this.props.selectRoute(route);
        }
    }

    render() {
        return (
            <Text style={styles.text}>{this.props.selectedRoute && this.props.selectedRoute.get('shortName')}</Text>
        );
    }

}

const styles = StyleSheet.create({
    text: {
        fontSize: 390,
        color: '#ffffff',
    },
});