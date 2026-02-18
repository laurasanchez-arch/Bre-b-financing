import React from 'react';
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    type GestureResponderEvent,
    type ViewStyle,
} from 'react-native';

import NuText from './NuText';

export type NuButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  loading?: boolean;
  disabled?: boolean;
};

export default function NuButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: NuButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
      ] as ViewStyle[]}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <NuText
          variant="body"
          weight="bold"
          color={isDisabled ? 'rgba(0,0,0,0.32)' : '#FFFFFF'}
          style={styles.title}
        >
          {title}
        </NuText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#820AD1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  disabled: {
    backgroundColor: '#EFEFEF',
  },
  pressed: {
    opacity: 0.9,
  },
  title: {
    // Keep button label slightly tighter
    lineHeight: 20,
  },
});
