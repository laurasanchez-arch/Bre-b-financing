import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';

import CloseIcon from '@/assets/icons/Icons/outlined/navigation/close.svg';
import MoreIcon from '@/assets/icons/Icons/outlined/navigation/more_horizontal.svg';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type LoadingPhase = 'sending' | 'waiting' | 'done';

export default function LoadingScreen() {
  const router = useRouter();
  const [phase, setPhase] = useState<LoadingPhase>('sending');
  const progressAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const t1 = setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPhase('waiting');
      Animated.timing(progressAnim, {
        toValue: 0.65,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }, 1500);

    const t2 = setTimeout(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setPhase('done');
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, 3000);

    const t3 = setTimeout(() => {
      router.replace('/success');
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [router, progressAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable hitSlop={8} style={styles.iconButton}>
          <CloseIcon width={24} height={24} fill="#000000" />
        </Pressable>
        <Pressable hitSlop={8} style={styles.iconButton}>
          <MoreIcon width={24} height={24} fill="#000000" />
        </Pressable>
      </View>

      {/* Spacer pushes text to bottom */}
      <View style={styles.spacer} />

      {/* Text area */}
      <View style={styles.textArea}>
        {phase === 'sending' && (
          <NuText weight="bold" style={styles.primaryText} color="#000000">
            Enviando...
          </NuText>
        )}

        {phase === 'waiting' && (
          <>
            <NuText weight="bold" style={[styles.primaryText, styles.fadedAbove]} color="#ADADAD">
              Enviando...
            </NuText>
            <NuText weight="bold" style={styles.primaryText} color="#000000">
              Un momento
            </NuText>
          </>
        )}

        {phase === 'done' && (
          <NuText weight="bold" style={styles.primaryText} color="#000000">
            ¡Listo!
          </NuText>
        )}
      </View>

      {/* Progress bar */}
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            {
              width: progressAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>

      {/* Bottom spacing */}
      <View style={styles.bottomSpacer} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    height: 56,
  },
  iconButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {
    flex: 1,
  },
  textArea: {
    paddingHorizontal: 48,
    paddingBottom: 16,
    minHeight: 80,
    justifyContent: 'flex-end',
  },
  primaryText: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
  },
  fadedAbove: {
    marginBottom: 4,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E6E6E6',
    marginHorizontal: 48,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#820AD1',
    borderRadius: 2,
  },
  bottomSpacer: {
    height: 48,
  },
});
