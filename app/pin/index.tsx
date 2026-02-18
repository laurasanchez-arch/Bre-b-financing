import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';

const PIN_LENGTH = 4;

function PinDot({ isFilledOrFocused }: { isFilledOrFocused: boolean }) {
  if (isFilledOrFocused) {
    return (
      <View style={styles.dotFilledOuter}>
        <View style={styles.dotFilledInner} />
      </View>
    );
  }
  
  return <View style={styles.dotEmpty} />;
}

export default function PinScreen() {
  const router = useRouter();
  const inputRef = useRef<TextInput>(null);
  const [pin, setPin] = useState('');

  useEffect(() => {
    if (pin.length !== PIN_LENGTH) {
      return;
    }

    const timer = setTimeout(() => {
      router.replace('/loading');
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pin, router]);

  const focusedIndex = pin.length < PIN_LENGTH ? pin.length : -1;

  const handleChangePin = (text: string) => {
    const onlyDigits = text.replace(/\D/g, '').slice(0, PIN_LENGTH);
    setPin(onlyDigits);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          hitSlop={8}
          onPress={() => router.back()}
          style={styles.topBarButton}
        >
          <MaterialIcons color="#5C5C5C" name="close" size={24} />
        </Pressable>

        <Pressable hitSlop={8} onPress={() => undefined} style={styles.topBarButton}>
          <MaterialIcons color="#5C5C5C" name="more-horiz" size={24} />
        </Pressable>
      </View>

      <View style={styles.headerWrap}>
        <NuText color="#AE77E7" style={styles.headerEyebrow} weight="bold">
          Tarjeta de crédito
        </NuText>
        <NuText color="#191919" style={styles.headerTitle} weight="bold">
          Ingresa tu PIN
        </NuText>
      </View>

      <View style={styles.cardWrap}>
        <Image
          source={require('@/assets/images/credit_card.png')}
          style={styles.card}
          resizeMode="cover"
        />
      </View>

      <Pressable
        onPress={() => inputRef.current?.focus()}
        style={styles.pinFieldContainer}
      >
        <View style={styles.pinRow}>
          {Array.from({ length: PIN_LENGTH }).map((_, index) => (
            <View key={`pin-slot-${index}`} style={styles.dotSlot}>
              <PinDot isFilledOrFocused={index < pin.length} />
            </View>
          ))}
        </View>
      </Pressable>

      <TextInput
        ref={inputRef}
        autoFocus
        keyboardType="number-pad"
        maxLength={PIN_LENGTH}
        onChangeText={handleChangePin}
        style={styles.hiddenInput}
        value={pin}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  topBar: {
    height: 56,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topBarButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerWrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 4,
  },
  headerEyebrow: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.48,
  },
  headerTitle: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.48,
  },
  cardWrap: {
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  card: {
    width: 285,
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  pinFieldContainer: {
    marginTop: -20,
    alignSelf: 'center',
    width: 327,
    minHeight: 80,
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    paddingHorizontal: 31,
    paddingVertical: 16,
  },
  pinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
  },
  dotSlot: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotFilledOuter: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotFilledInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#000000',
  },
  dotEmpty: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#BDBDBD',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
});
