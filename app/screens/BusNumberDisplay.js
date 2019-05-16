import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    Alert,
    Modal
} from 'react-native';
import { ScreenOrientation } from 'expo';
import GetBusNumber from '../components/GetBusNumber';
import { Routes } from '../containers/Routes';
import ModalExample from '../components/ConfirmationPopUp';

const ShowBusNumber = Routes(GetBusNumber);

export default class HomeScreen extends React.Component {


    static navigationOptions = {
        header: null,
    };

    componentDidMount() {
        ScreenOrientation.allowAsync(ScreenOrientation.Orientation.ALL);
    }

    //   showConfirmation(){
    //     console.log("hey");
    //     Alert.alert('hey', 'bye');
    //   }
    state = {
        modalVisible: false,
    };

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={styles.container} contentContainerStyle={styles.contentContainer}>
                <StatusBar hidden />
                <View>
                    <Text style={styles.confirmationText}>Am I getting on bus</Text>
                    <ShowBusNumber />
                </View>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            alert('Modal has been closed.');
                        }}>

                        {/* <View style={{
                            marginTop: 22, backgroundColor: "#fff",
                            height: 300, width: 200, flex: 1, justifyContent: 'center', alignItems: 'center'
                        }}> */}

                        {/* overall modal */}
                        <View style={{
                            backgroundColor: 'rgba(0,0,0,0.5)',flex: 1
                        }}>
                            {/* text/button space */}
                            
                            <View style={{ backgroundColor: "#fff", margin: 50, width: 300, height: 500}}>

                                <Text style={{transform: [{ rotate: '90deg' }], fontSize: 25}} >
                                    Can you confirm that I am getting on bus 67?
                                </Text>

                                {/* yes and no popup buttons */}
                                <View style={{ flex: 1, justifyContent: 'space-between'}}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#4A78BD',
                                            width: 75,
                                            height: 150,
                                            textAlign: 'center',
                                            // marginTop: -18
                                        }}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Text style={styles.confirm}>YES</Text>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#FC4A1A',
                                            width: 75,
                                            height: 150

                                        }}
                                        onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                        }}>

                                        <Text style={styles.confirm}>NO</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        {/* </View> */}
                    </Modal>
                    <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Text style={styles.buttonText}>Y E S</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.button} onPress={() => console.log("heyyy")}>
                        <Text style={styles.buttonText}>Y E S</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.buttonNo}>
                        <Text style={styles.buttonText}>N O</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#F7B733',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    // developmentModeText: {
    //     marginBottom: 20,
    //     color: 'rgba(0,0,0,0.4)',
    //     fontSize: 14,
    //     lineHeight: 19,
    //     textAlign: 'center',
    // },
    contentContainer: {
        paddingTop: 30,
    },
    text: {
        fontSize: 390,
        color: '#ffffff',
        // marginLeft: 95,
    },
    confirmationText: {
        fontSize: 34,
        color: '#ffffff',
        marginBottom: -70,
        marginLeft: 30,

    },
    button: {
        alignItems: 'center',
        backgroundColor: '#4A78BD',
        padding: 5,
        width: 50,
        flexGrow: 1,
    },
    buttonNo: {
        alignItems: 'center',
        backgroundColor: '#FC4A1A',
        padding: 5,
        width: 50,
        flexGrow: 1,
    },
    buttonText: {
        color: "#fff",
        fontSize: 30,
    },
    confirm: {
        transform: [{ rotate: '90deg' }],
    },
});
