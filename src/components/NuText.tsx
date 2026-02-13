import React from 'react';
import { StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

export type NuTextVariant = 'title' | 'body' | 'caption';
export type NuTextWeight = 'bold' | 'regular';

export type NuTextProps = TextProps & {
  children: React.ReactNode;
  variant?: NuTextVariant;
  weight?: NuTextWeight;
  color?: string;
};

export default function NuText({
  children,
  variant = 'body',
  weight = 'regular',
  color = '#191919',
  style,
  ...rest
}: NuTextProps) {
  const variantStyle = stylesByVariant[variant];
  const weightStyle = weight === 'bold' ? styles.weightBold : styles.weightRegular;
  const dynamicStyles = React.useMemo(() => StyleSheet.create({ color: { color } }), [color]);

  return (
    <Text
      {...rest}
      style={[styles.base, variantStyle, weightStyle, dynamicStyles.color, style] as TextStyle[]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  base: {
    fontFamily: 'NuSansRegular',
  },
  weightRegular: {
    fontFamily: 'NuSansRegular',
  },
  weightBold: {
    fontFamily: 'NuSansBold',
  },
});

const stylesByVariant = StyleSheet.create({
  title: {
    fontSize: 24,
    lineHeight: 30,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
});
