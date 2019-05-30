import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import SubTitleText from '../text/SubTitleText';
import { config } from '../../config';

export default function OBAPicker({ onSelect, options }) {
  return (
    <FlatList
      data={options || [{ value: '', label: 'Loading...' }]}
      keyExtractor={item => item.value}
      renderItem={({ item }) => (
        <TouchableHighlight
          accessibilityRole="button"
          onPress={() => onSelect(item.value)}
        >
          <View
            style={{
              padding: 30,
              marginBottom: 20,
              backgroundColor: config.colors.contentBox,
            }}
          >
            <SubTitleText
              bold
              style={{ color: config.colors.contentText }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.label}
            </SubTitleText>
          </View>
        </TouchableHighlight>
      )}
    />
  );
}