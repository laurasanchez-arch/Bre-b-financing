import { useRouter } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';
import useFinancialMath from '@/src/hooks/useFinancialMath';

import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';
import CloseIcon from '@/assets/icons/Icons/outlined/navigation/close.svg';
import HelpIcon from '@/assets/icons/Icons/help.svg';
import ReceiptIcon from '@/assets/icons/Icons/outlined/financial/other/receipt.svg';
import TransferSucceedIcon from '@/assets/icons/Icons/outlined/financial/Transfer Succeed.svg';

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

function formatTax(value: number): string {
  return `$${new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)}`;
}

type DetailRowProps = {
  label: string;
  value: string;
  showTopDivider?: boolean;
};

function DetailRow({ label, value, showTopDivider = true }: DetailRowProps) {
  return (
    <>
      {showTopDivider && <View style={styles.divider} />}
      <View style={styles.detailRow}>
        <NuText weight="bold" style={styles.detailLabel}>
          {label}
        </NuText>
        <NuText weight="regular" color="#000000" style={styles.detailValue}>
          {value}
        </NuText>
      </View>
    </>
  );
}

export default function SuccessScreen() {
  const router = useRouter();
  const { transaction, confirmTransaction } = useTransaction();
  const hasConfirmed = useRef(false);
  const displayDataRef = useRef<{ amount: number; installments: number } | null>(null);

  if (displayDataRef.current === null && transaction.amount != null) {
    displayDataRef.current = {
      amount: transaction.amount,
      installments: transaction.installments,
    };
  }

  const amount = displayDataRef.current?.amount ?? transaction.amount ?? 0;
  const installments = displayDataRef.current?.installments ?? transaction.installments ?? 1;
  const { tax4x1000 } = useFinancialMath({ amount, installments });

  useEffect(() => {
    if (!hasConfirmed.current) {
      hasConfirmed.current = true;
      confirmTransaction();
    }
  }, [confirmTransaction]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Top bar */}
          <View style={styles.topBar}>
            <Pressable
              hitSlop={8}
              onPress={() => router.replace('/')}
              style={styles.iconButton}
            >
              <CloseIcon width={24} height={24} fill="#000000" />
            </Pressable>

            <View style={styles.navLogos}>
              <BreBLogoIcon height={24} width={28} />
              <View style={styles.logoDivider} />
              <NuLogoIcon height={13} width={16} />
            </View>

            <Pressable hitSlop={8} style={styles.iconButton}>
              <HelpIcon width={24} height={24} fill="#000000" />
            </Pressable>
          </View>

          {/* Hero illustration */}
          <View style={styles.heroSection}>
            <TransferSucceedIcon width={151} height={150} style={styles.illustration} />
            <NuText weight="bold" style={styles.heroTitle}>
              ¡Listo! Enviaste tu dinero
            </NuText>
          </View>

          {/* Amount block */}
          <View style={styles.amountSection}>
            <NuText weight="bold" style={styles.amountText}>
              {formatCOP(amount)}
            </NuText>
            <NuText weight="regular" color="#000000" style={styles.beneficiaryText}>
              Para Ma*** Sil**
            </NuText>
          </View>

          {/* Detail rows */}
          <View style={styles.detailsSection}>
            <DetailRow
              label="Más impuesto del 4X1000"
              value={formatTax(tax4x1000)}
            />
            <DetailRow
              label="Recibe en su cuenta de"
              value="Bancolombia"
            />
            <DetailRow
              label="Fecha de envío"
              value="30 de mayo de 2026 a las 12:30h"
            />
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <View style={styles.footerContent}>
            <Pressable
              accessibilityRole="button"
              onPress={() => Alert.alert('Próximamente')}
              style={({ pressed }) => [
                styles.comprobanteButton,
                pressed && styles.comprobanteButtonPressed,
              ]}
            >
              <ReceiptIcon width={24} height={24} fill="#FFFFFF" />
              <NuText weight="bold" color="#FFFFFF" style={styles.comprobanteText}>
                Abrir comprobante
              </NuText>
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
  main: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  /* Top bar */
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

  /* Hero */
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  illustration: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
    color: '#000000',
  },

  /* Amount */
  amountSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  amountText: {
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1.08,
    color: '#000000',
  },
  beneficiaryText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    marginTop: 4,
  },

  /* Details */
  detailsSection: {
    paddingBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  detailRow: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  detailLabel: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
    color: '#000000',
  },
  detailValue: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    marginTop: 2,
  },

  /* Footer */
  footer: {
    backgroundColor: '#FFFFFF',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  footerContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  comprobanteButton: {
    height: 56,
    borderRadius: 64,
    backgroundColor: '#820AD1',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  comprobanteButtonPressed: {
    opacity: 0.9,
  },
  comprobanteText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
  },
});
