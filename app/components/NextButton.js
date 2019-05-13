import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { config } from '../config';
import NextButtonText from './text/NextButtonText';

export default function NextButton(props) {
  return (
    <TouchableNativeFeedback
      accessibilityComponentType="button"
      onPress={() => props.onPress(props)}
      background={TouchableNativeFeedback.SelectableBackground()}
    >
      <View style={{ ...styles.container, ...props.style }}>
        <NextButtonText>{props.text}</NextButtonText>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: config.colors.nextButtonBackground,
  },
});