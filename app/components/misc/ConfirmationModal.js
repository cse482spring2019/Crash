import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import RobotoText from '../text/RobotoText';
import YesNoButton from './YesNoButton';
import { config } from '../../config';

export default function ConfirmationModal(props) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.dialog}>
          <RobotoText style={styles.confirmationText}>
            Can you confirm your selection?
          </RobotoText>
          <View style={styles.buttonRow}>
            <YesNoButton
              onPress={props.onYes}
              color={config.colors.shellBackground}
              text="YES"
            />
            <YesNoButton
              onPress={props.onNo}
              color={config.colors.nextButtonBackground}
              text="NO"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    borderRadius: 20,
    height: 250,
    width: 450,
    padding: 25,
    backgroundColor: 'white',
  },
  confirmationText: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});