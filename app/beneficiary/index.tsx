import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import NuInput from '@/src/components/NuInput';
import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';

import ArrowRightIcon from '@/assets/icons/Icons/outlined/navigation/arrow_right.svg';
import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import HelpIcon from '@/assets/icons/Icons/help.svg';
import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';
import QrCodeIcon from '@/assets/icons/Icons/qrcode.svg';

export default function Beneficiary() {
  const router = useRouter();
  const { updateTransaction } = useTransaction();
  const [text, setText] = useState('');

  const isButtonDisabled = text.length <= 5;

  const handleContinue = () => {
    updateTransaction({ beneficiary: text });
    router.push('/funding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <View style={styles.flex}>
          {/* ── Navigation Bar ── */}
          <View style={styles.navBar}>
            <Pressable hitSlop={8} onPress={() => router.back()} style={styles.navButton}>
              <LeftArrowIcon width={24} height={24} />
            </Pressable>

            <View style={styles.navLogos}>
              <BreBLogoIcon height={24} width={28} />
              <View style={styles.logoDivider} />
              <NuLogoIcon height={13} width={16} />
            </View>

            <Pressable hitSlop={8} onPress={() => undefined} style={styles.navButton}>
              <HelpIcon width={24} height={24} />
            </Pressable>
          </View>

          {/* ── Title ── */}
          <View style={styles.titleSection}>
            <NuText variant="title" weight="bold" style={styles.title}>
              ¿A quién le quieres enviar dinero?
            </NuText>
          </View>

          {/* ── Input ── */}
          <View style={styles.inputSection}>
            <NuInput
              label="Escribe la llave de quien recibe"
              value={text}
              onChangeText={setText}
              placeholder="Correo, celular, cédula, @llave"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              trailing={
                <Pressable hitSlop={8}>
                  <QrCodeIcon width={24} height={24} />
                </Pressable>
              }
            />
          </View>

          {/* ── Hint Text ── */}
          <View style={styles.hintSection}>
            <NuText variant="caption" color="rgba(0,0,0,0.64)" style={styles.hintText}>
              Recuerda que las llaves alfanuméricas como @LlaveNu empiezan con arroba.
            </NuText>
          </View>

          {/* ── Contacts Section ── */}
          <View style={styles.contactsSection}>
            <NuText variant="caption" weight="bold" style={styles.contactsTitle}>
              Tus contactos en Bre-B
            </NuText>
          </View>

          {/* ── Spacer ── */}
          <View style={styles.flex} />

          {/* ── FAB Button ── */}
          <View style={styles.fabContainer}>
            <Pressable
              onPress={handleContinue}
              disabled={isButtonDisabled}
              style={({ pressed }) => [
                styles.fab,
                isButtonDisabled && styles.fabDisabled,
                pressed && !isButtonDisabled && styles.fabPressed,
              ]}
            >
              <ArrowRightIcon
                width={24}
                height={24}
                fill={isButtonDisabled ? 'rgba(0,0,0,0.32)' : '#FFFFFF'}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },

  /* ── Navigation Bar ── */
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    height: 56,
  },
  navButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoDivider: {
    width: 0.5,
    height: 12,
    backgroundColor: '#030303',
  },

  /* ── Title ── */
  titleSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
    color: 'rgba(0,0,0,0.96)',
  },

  /* ── Input ── */
  inputSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  /* ── Hint ── */
  hintSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  hintText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },

  /* ── Contacts ── */
  contactsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  contactsTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#5C5C5C',
  },

  /* ── FAB ── */
  fabContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#820AD1',
    alignItems: 'center',
    justifyContent: 'center',
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  fabDisabled: {
    backgroundColor: '#EFEFEF',
  },
  fabPressed: {
    opacity: 0.85,
  },
});
