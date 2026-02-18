import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import type { SvgProps } from 'react-native-svg';

import NuText from './NuText';

export type FundingCardProps = {
  title: string;
  balance: string;
  disabled?: boolean;
  selected?: boolean;
  onPress: () => void;
  icon: React.FC<SvgProps>;
  badge?: string;
  subtitle?: string;
  style?: ViewStyle;
};

export default function FundingCard({
  title,
  balance,
  disabled = false,
  selected = false,
  onPress,
  icon: Icon,
  badge,
  subtitle,
  style: styleProp,
}: FundingCardProps) {
  const showBadge = !!badge && !disabled;

  const containerStyle = [
    styles.container,
    selected && styles.containerSelected,
    disabled && styles.containerDisabled,
    styleProp,
  ];

  const iconFill = disabled
    ? 'rgba(0,0,0,0.32)'
    : selected
      ? '#820AD1'
      : 'rgba(0,0,0,0.64)';

  const titleColor = disabled
    ? 'rgba(0,0,0,0.32)'
    : selected
      ? '#820AD1'
      : 'rgba(0,0,0,0.96)';

  const balanceColor = disabled
    ? 'rgba(0,0,0,0.32)'
    : selected
      ? '#820AD1'
      : 'rgba(0,0,0,0.64)';

  const subtitleColor = selected ? '#820AD1' : 'rgba(0,0,0,0.32)';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={containerStyle}
    >
      <View style={styles.inner}>
        {/* Top row: icon + optional badge */}
        <View style={styles.topRow}>
          <Icon width={24} height={24} fill={iconFill} />
          {showBadge && (
            <View style={styles.badge}>
              <NuText
                variant="caption"
                weight="bold"
                color="#FFFFFF"
                style={styles.badgeText}
              >
                {badge}
              </NuText>
            </View>
          )}
        </View>

        {/* Bottom content: title, balance, optional subtitle */}
        <View style={styles.bottomContent}>
          <NuText
            variant="caption"
            weight="bold"
            color={titleColor}
            style={styles.title}
          >
            {title}
          </NuText>
          <NuText variant="caption" weight="regular" color={balanceColor}>
            {balance}
          </NuText>
          {!!subtitle && (
            <NuText variant="caption" weight="regular" color={subtitleColor}>
              {subtitle}
            </NuText>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#EFEFEF',
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  containerSelected: {
    backgroundColor: '#FAF6FF',
    borderColor: '#820AD1',
  },
  containerDisabled: {
    backgroundColor: '#FFFFFF',
    borderColor: '#EFEFEF',
  },
  inner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  badge: {
    backgroundColor: '#820AD1',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    minHeight: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
  },
  bottomContent: {
    gap: 2,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
});
