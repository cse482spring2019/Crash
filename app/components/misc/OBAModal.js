import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { config } from '../../config';

export default function OBAModal(props) {
  return (
    <Modal
      accessibilityLiveRegion="polite"
      animationType="slide"
      transparent={true}
      visible={props.visible}
      supportedOrientations={['portrait', 'landscape']}
      onRequestClose={props.onRequestClose}
    >
      <View style={styles.container}>
        <View style={{ ...styles.dialog, ...props.style }}>
          {props.children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  dialog: {
    justifyContent: 'space-between',
    alignItems: 'stretch',
    padding: 25,
    backgroundColor: config.colors.modalBackground,
  },
});