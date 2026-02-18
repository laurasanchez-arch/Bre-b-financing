import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, Path, Defs, LinearGradient, Stop, Ellipse } from 'react-native-svg';

export default function SuccessIllustration() {
  return (
    <View style={styles.container}>
      <Svg width={160} height={130} viewBox="0 0 160 130">
        <Defs>
          <LinearGradient id="greenGlow" x1="0" y1="0" x2="1" y2="1">
            <Stop offset="0" stopColor="#A8E6CF" stopOpacity="0.6" />
            <Stop offset="1" stopColor="#56C596" stopOpacity="0.2" />
          </LinearGradient>
        </Defs>

        {/* Green glow background shape */}
        <Ellipse cx="85" cy="70" rx="55" ry="50" fill="url(#greenGlow)" />

        {/* Bottom-left purple coin (darkest, behind) */}
        <Circle cx="35" cy="100" r="22" fill="#D4B3F5" />
        <Ellipse cx="35" cy="98" rx="16" ry="8" fill="#C49FEE" opacity={0.6} />

        {/* Middle-left purple coin */}
        <Circle cx="55" cy="78" r="22" fill="#AE77E7" />
        <Ellipse cx="55" cy="76" rx="16" ry="8" fill="#9B5FDF" opacity={0.6} />

        {/* Top-center purple coin */}
        <Circle cx="80" cy="60" r="22" fill="#820AD1" />
        <Ellipse cx="80" cy="58" rx="16" ry="8" fill="#6E08B1" opacity={0.6} />

        {/* Green checkmark circle */}
        <Circle cx="100" cy="35" r="22" fill="#00A650" />
        <Path
          d="M90 35L97 42L112 28"
          stroke="white"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingTop: 8,
    paddingBottom: 16,
  },
});
