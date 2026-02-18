import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import FundingCard from '@/src/components/FundingCard';
import NuButton from '@/src/components/NuButton';
import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';

import HelpIcon from '@/assets/icons/Icons/help.svg';
import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import CardIcon from '@/assets/icons/Icons/outlined/financial/cards/card.svg';
import MoneyIcon from '@/assets/icons/Icons/outlined/financial/other/money.svg';
import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';

const SAVINGS_BALANCE = 100000;
const CREDIT_BALANCE = 2000000;

function formatCOP(centavos: number): string {
  const integerPart = Math.floor(centavos / 100);
  const decimalPart = centavos % 100;
  const formattedInteger = integerPart
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const formattedDecimal = decimalPart.toString().padStart(2, '0');
  return `${formattedInteger},${formattedDecimal}`;
}

export default function Funding() {
  const router = useRouter();
  const { updateTransaction } = useTransaction();
  const inputRef = useRef<TextInput>(null);

  const [centavos, setCentavos] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const amountInPesos = centavos / 100;
  const savingsDisabled = amountInPesos > SAVINGS_BALANCE;
  const creditDisabled = amountInPesos > CREDIT_BALANCE;
  const canContinue = centavos > 0 && selectedMethod !== null;

  useEffect(() => {
    if (savingsDisabled && selectedMethod === 'savings') {
      setSelectedMethod(null);
    }
    if (creditDisabled && selectedMethod === 'credit-card') {
      setSelectedMethod(null);
    }
  }, [savingsDisabled, creditDisabled, selectedMethod]);

  const handleAmountChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    setCentavos(digits === '' ? 0 : parseInt(digits, 10));
  };

  const handleSelectMethod = (method: string) => {
    setSelectedMethod((prev) => (prev === method ? null : method));
  };

  const handleContinue = () => {
    updateTransaction({ amount: centavos / 100, paymentMethod: selectedMethod });
    router.push('/simulator');
  };

  const displayText = formatCOP(centavos);
  const displayColor = centavos === 0 ? 'rgba(0,0,0,0.32)' : 'rgba(0,0,0,0.96)';

  const buttonText =
    selectedMethod === 'credit-card' ? 'Continuar con tarjeta de crédito' : 'Continuar';

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

          {/* ── Beneficiary Info ── */}
          <View style={styles.beneficiarySection}>
            <NuText
              variant="caption"
              weight="bold"
              color="rgba(0,0,0,0.64)"
              style={styles.beneficiaryLabel}
            >
              Transferir a
            </NuText>
            <NuText
              variant="body"
              weight="bold"
              color="rgba(0,0,0,0.96)"
              style={styles.beneficiaryName}
            >
              Mar*** Sil***
            </NuText>
          </View>

          {/* ── Amount Input ── */}
          <View style={styles.amountSection}>
            <NuText variant="caption" weight="regular" color="#737373" style={styles.amountLabel}>
              Monto
            </NuText>
            <Pressable
              style={styles.amountRow}
              onPress={() => inputRef.current?.focus()}
            >
              <NuText variant="title" weight="bold" style={styles.amountPrefix}>
                $
              </NuText>
              <View style={styles.amountDisplayWrapper}>
                <NuText
                  variant="title"
                  weight="bold"
                  color={displayColor}
                  style={styles.amountDisplay}
                >
                  {displayText}
                </NuText>
                <TextInput
                  ref={inputRef}
                  value={centavos === 0 ? '' : centavos.toString()}
                  onChangeText={handleAmountChange}
                  keyboardType="number-pad"
                  style={styles.amountInput}
                  autoFocus
                  caretHidden
                />
              </View>
            </Pressable>
            <View style={styles.amountUnderline} />
          </View>

          {/* ── Section Title ── */}
          <View style={styles.sectionTitleRow}>
            <NuText
              variant="body"
              weight="bold"
              color="rgba(0,0,0,0.96)"
              style={styles.sectionTitle}
            >
              Transfiriendo con
            </NuText>
          </View>

          {/* ── Funding Cards ── */}
          <View style={styles.cardsRow}>
            <FundingCard
              icon={MoneyIcon}
              title="Cuenta de ahorros"
              balance="$ 100.000"
              selected={selectedMethod === 'savings'}
              disabled={savingsDisabled}
              subtitle={savingsDisabled ? 'Saldo insuficiente' : undefined}
              onPress={() => handleSelectMethod('savings')}
              style={styles.card}
            />
            <FundingCard
              icon={CardIcon}
              title="Tarjeta de crédito"
              balance="$ 2.000.000"
              badge="Hasta 36 cuotas"
              selected={selectedMethod === 'credit-card'}
              disabled={creditDisabled}
              subtitle={creditDisabled ? 'Saldo insuficiente' : undefined}
              onPress={() => handleSelectMethod('credit-card')}
              style={styles.card}
            />
          </View>

          {/* ── Spacer ── */}
          <View style={styles.flex} />

          {/* ── Continue Button ── */}
          <View style={styles.bottomBar}>
            <NuButton
              title={buttonText}
              onPress={handleContinue}
              disabled={!canContinue}
            />
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

  /* ── Beneficiary ── */
  beneficiarySection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 4,
  },
  beneficiaryLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  beneficiaryName: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.16,
  },

  /* ── Amount Input ── */
  amountSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  amountLabel: {
    marginBottom: 6,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  amountPrefix: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
    color: 'rgba(0,0,0,0.96)',
  },
  amountDisplayWrapper: {
    position: 'relative',
  },
  amountDisplay: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
  },
  amountInput: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  amountUnderline: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginTop: 12,
  },

  /* ── Section Title ── */
  sectionTitleRow: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
  },

  /* ── Funding Cards ── */
  cardsRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  card: {
    flex: 1,
    height: 126,
  },

  /* ── Bottom Bar ── */
  bottomBar: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
  },
});
