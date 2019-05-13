import React from 'react';
import { Picker, View } from 'react-native';

function generateOptions(options) {
  if (options) {
    return (
      options
        .map(option =>
          <Picker.Item key={option.value} label={option.label} value={option.value} />
        )
    );
  } else {
    return <Picker.Item label="Loading options..." value="" />
  }
}

export default function OBAPicker({ selected, onSelect, style, pickerStyle, options }) {
  return (
    <View
      style={{
        margin: 10,
        borderRadius: 20,
        backgroundColor: 'white',
        ...style
      }}
    >
      <Picker
        style={{ height: 100, ...pickerStyle }}
        selectedValue={selected}
        onValueChange={onSelect}
      >
        {generateOptions(options)}
      </Picker>
    </View>
  );
}