import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import NuText from './NuText';

export type NuInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function NuInput({ label, value, onChangeText, placeholder }: NuInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <NuText variant="caption" weight="regular" color="#737373" style={styles.label}>
        {label}
      </NuText>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#B3B3B3"
        style={styles.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />

      <View style={focused ? styles.underlineFocused : styles.underline} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
  },
  input: {
    fontFamily: 'NuSansRegular',
    fontSize: 16,
    lineHeight: 22,
    color: '#191919',
    paddingVertical: 8,
    paddingHorizontal: 0,
  },
  underline: {
    height: 2,
    backgroundColor: '#E6E6E6',
  },
  underlineFocused: {
    height: 2,
    backgroundColor: '#820AD1',
  },
});
