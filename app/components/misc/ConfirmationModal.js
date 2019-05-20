import React from 'react';
import { StyleSheet, View } from 'react-native';
import OBAModal from './OBAModal';
import RobotoText from '../text/RobotoText';
import YesNoButton from './YesNoButton';
import { config } from '../../config';

export default function ConfirmationModal(props) {
  return (
    <OBAModal
      animationType="slide"
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onRequestClose}
      style={{ height: 250, width: 450 }}
    >
      <RobotoText bold style={styles.confirmationText}>
        Can you confirm your selection?
      </RobotoText>
      <View style={styles.buttonRow}>
        <YesNoButton
          style={{ width: 150 }}
          onPress={props.onYes}
          color={config.colors.contentBox}
          text="YES"
        />
        <YesNoButton
          style={{ width: 150 }}
          onPress={props.onNo}
          color={config.colors.warning}
          text="NO"
        />
      </View>
    </OBAModal>
  );
}

const styles = StyleSheet.create({
  confirmationText: {
    fontSize: 30,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
});