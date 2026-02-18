import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';
import useFinancialMath, { FINANCIAL_CONSTANTS } from '@/src/hooks/useFinancialMath';

import HelpIcon from '@/assets/icons/Icons/help.svg';
import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';
import ArrowRightIcon from '@/assets/icons/Icons/outlined/navigation/arrow_right.svg';

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 36;

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\u00A0/g, ' ');
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <View style={styles.detailRow}>
      <NuText variant="caption" weight="regular" color="rgba(0,0,0,0.64)" style={styles.detailLabel}>
        {label}
      </NuText>
      <NuText variant="caption" weight="regular" color="rgba(0,0,0,0.64)" style={styles.detailValue}>
        {value}
      </NuText>
    </View>
  );
}

export default function Simulator() {
  const router = useRouter();
  const { transaction, updateTransaction } = useTransaction();

  const amount = transaction.amount ?? 0;
  const installments = transaction.installments ?? MIN_INSTALLMENTS;

  const { monthlyPayment, totalInterest, tax4x1000, totalWithFees } = useFinancialMath({
    amount,
    installments,
  });

  const isMinInstallments = installments <= MIN_INSTALLMENTS;
  const isMaxInstallments = installments >= MAX_INSTALLMENTS;

  const installmentText = useMemo(() => {
    return installments === 1 ? 'en 1 cuota' : `en ${installments} cuotas`;
  }, [installments]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
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

        <View style={styles.headerSection}>
          <NuText variant="title" weight="bold" style={styles.title}>
            Elige en cuántas cuotas quieres pagar
          </NuText>
          <NuText variant="body" weight="regular" color="#5C5C5C" style={styles.subtitle}>
            {`Monto a transferir: ${formatCOP(amount)}`}
          </NuText>
        </View>

        <View style={styles.stepperSection}>
          <NuText variant="body" weight="bold" color="#5C5C5C" style={styles.sectionLabel}>
            Número de cuotas
          </NuText>

          <View style={styles.stepperRow}>
            <View style={styles.stepperTextWrap}>
              <NuText variant="body" weight="bold" color="#000000" style={styles.paymentValue}>
                {`Pagas ${formatCOP(monthlyPayment)}`}
              </NuText>
              <NuText variant="body" weight="regular" color="rgba(0,0,0,0.64)" style={styles.installmentText}>
                {installmentText}
              </NuText>

              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/simulator/compare')}
                style={({ pressed }) => [
                  styles.compareCta,
                  pressed && styles.compareCtaPressed,
                ]}
              >
                <NuText variant="body" weight="bold" color="#820AD1" style={styles.compareCtaText}>
                  Comparar cuotas
                </NuText>
                <ArrowRightIcon width={16} height={16} fill="#820AD1" />
              </Pressable>
            </View>

            <View style={styles.stepperButtons}>
              <Pressable
                accessibilityRole="button"
                disabled={isMinInstallments}
                onPress={() =>
                  updateTransaction({ installments: Math.max(MIN_INSTALLMENTS, installments - 1) })
                }
                style={({ pressed }) => [
                  styles.circleButton,
                  isMinInstallments && styles.circleButtonDisabled,
                  pressed && !isMinInstallments && styles.circleButtonPressed,
                ]}
              >
                <NuText
                  variant="title"
                  weight="regular"
                  color={isMinInstallments ? 'rgba(0,0,0,0.32)' : '#000000'}
                  style={styles.circleSymbol}
                >
                  -
                </NuText>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                disabled={isMaxInstallments}
                onPress={() =>
                  updateTransaction({ installments: Math.min(MAX_INSTALLMENTS, installments + 1) })
                }
                style={({ pressed }) => [
                  styles.circleButton,
                  isMaxInstallments && styles.circleButtonDisabled,
                  pressed && !isMaxInstallments && styles.circleButtonPressed,
                ]}
              >
                <NuText
                  variant="title"
                  weight="regular"
                  color={isMaxInstallments ? 'rgba(0,0,0,0.32)' : '#000000'}
                  style={styles.circleSymbol}
                >
                  +
                </NuText>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailsTopDivider} />
          <DetailRow
            label="Intereses estimados (18,45% E.A.)"
            value={formatCOP(totalInterest)}
          />
          <DetailRow label="Impuesto 4x1000" value={formatCOP(tax4x1000)} />
          <DetailRow
            label="Comisión que pagas en la 1ra cuota"
            value={formatCOP(FINANCIAL_CONSTANTS.FIXED_FEE)}
          />

          <Pressable onPress={() => undefined} style={styles.learnMoreButton}>
            <NuText variant="body" weight="bold" color="#820AD1" style={styles.learnMoreText}>
              Saber más
            </NuText>
          </Pressable>
        </View>

        <View style={styles.flex} />

        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <View style={styles.footerContent}>
            <View style={styles.footerTextWrap}>
              <NuText variant="body" weight="bold" color="#000000" style={styles.totalValue}>
                {formatCOP(totalWithFees)}
              </NuText>
              <NuText variant="body" weight="regular" color="#727683" style={styles.totalLabel}>
                Costo total estimado
              </NuText>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => {
                updateTransaction({ installments });
                router.push('/checkout');
              }}
              style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
            >
              <ArrowRightIcon width={24} height={24} fill="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
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
  headerSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    gap: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
    color: '#000000',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  sectionLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  stepperSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  stepperTextWrap: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
  paymentValue: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  installmentText: {
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.16,
  },
  compareCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    alignSelf: 'flex-start',
  },
  compareCtaPressed: {
    opacity: 0.85,
  },
  compareCtaText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  stepperButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  circleButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E6E6E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleButtonDisabled: {
    opacity: 0.6,
  },
  circleButtonPressed: {
    opacity: 0.85,
  },
  circleSymbol: {
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center',
    marginTop: -3,
  },
  detailsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
  detailsTopDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    minHeight: 40,
    paddingVertical: 8,
    gap: 16,
  },
  detailLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  detailValue: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    textAlign: 'right',
    flexShrink: 0,
  },
  learnMoreButton: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 4,
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    textDecorationLine: 'underline',
  },
  footer: {
    backgroundColor: '#FFFFFF',
  },
  footerDivider: {
    height: 2,
    backgroundColor: '#E6E6E6',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  footerTextWrap: {
    gap: 4,
  },
  totalValue: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  totalLabel: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#820AD1',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  fabPressed: {
    opacity: 0.85,
  },
});
