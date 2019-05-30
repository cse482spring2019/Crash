import React from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { config } from '../../config';
import NextButtonText from '../text/NextButtonText';

export default function NextButton(props) {
  return (
    <TouchableHighlight
      accessibilityRole="button"
      accessibilityHint="click this to go to next screen"
      accessibilityLabel="next button"
      onPress={() => props.onPress(props)}
    >
      <View style={{ ...styles.container, ...props.style }}>
        <NextButtonText>{props.children}</NextButtonText>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: config.colors.contentBox,
  },
});