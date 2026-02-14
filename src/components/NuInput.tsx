import React from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import NuText from './NuText';

export type NuInputProps = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  trailing?: React.ReactNode;
} & Omit<TextInputProps, 'value' | 'onChangeText' | 'placeholder'>;

export default function NuInput({
  label,
  value,
  onChangeText,
  placeholder,
  trailing,
  style: inputStyleOverride,
  ...rest
}: NuInputProps) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={styles.container}>
      <NuText variant="caption" weight="regular" color="#737373" style={styles.label}>
        {label}
      </NuText>

      <View style={styles.inputRow}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(0,0,0,0.32)"
          selectionColor="#820AD1"
          style={[styles.input, inputStyleOverride]}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...rest}
        />
        {trailing && <View style={styles.trailing}>{trailing}</View>}
      </View>

      <View style={styles.underline} />
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
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 32,
  },
  input: {
    flex: 1,
    fontFamily: 'NuSansBold',
    fontSize: 20,
    color: 'rgba(0,0,0,0.96)',
    paddingVertical: 8,
    paddingHorizontal: 0,
    letterSpacing: -0.4,
  },
  trailing: {
    marginLeft: 12,
  },
  underline: {
    height: 2,
    backgroundColor: '#EFEFEF',
  },
});
