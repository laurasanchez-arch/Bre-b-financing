import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';
import useFinancialMath, { FINANCIAL_CONSTANTS } from '@/src/hooks/useFinancialMath';

import HelpIcon from '@/assets/icons/Icons/help.svg';
import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import ChevronRightIcon from '@/assets/icons/Icons/outlined/navigation/chevron_right.svg';
import CalendarIcon from '@/assets/icons/Icons/outlined/objects/time/calendar.svg';
import OthersIcon from '@/assets/icons/Icons/outlined/categories/transactions/others.svg';
import PencilIcon from '@/assets/icons/Icons/outlined/ui actions/common actions/pencil.svg';
import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';

const MIN_INSTALLMENTS = 1;

function formatCOPNoSpace(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
    .format(value)
    .replace(/\u00A0/g, ' ')
    .replace('$ ', '$');
}

type PaymentRowProps = {
  label: string;
  value: string;
  isTotal?: boolean;
};

function PaymentRow({ label, value, isTotal = false }: PaymentRowProps) {
  return (
    <View style={styles.paymentRow}>
      <NuText
        variant="body"
        weight={isTotal ? 'bold' : 'regular'}
        color={isTotal ? '#191919' : '#727683'}
        style={styles.paymentRowLabel}
      >
        {label}
      </NuText>
      <NuText
        variant="body"
        weight={isTotal ? 'bold' : 'regular'}
        color="#191919"
        style={styles.paymentRowValue}
      >
        {value}
      </NuText>
    </View>
  );
}

export default function CheckoutScreen() {
  const router = useRouter();
  const { transaction } = useTransaction();

  const amount = transaction.amount ?? 0;
  const installments = transaction.installments ?? MIN_INSTALLMENTS;

  const { monthlyPayment, totalInterest, tax4x1000, totalWithFees } = useFinancialMath({
    amount,
    installments,
  });

  const installmentLabel =
    installments === 1
      ? `1 cuota de hasta ${formatCOPNoSpace(monthlyPayment)}`
      : `${installments} cuotas de hasta ${formatCOPNoSpace(monthlyPayment)}`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
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
            <NuText variant="title" weight="bold" color="#191919" style={styles.headerTitle}>
              Estás a punto de enviar
            </NuText>
          </View>

          <View style={styles.amountSection}>
            <View style={styles.amountHeader}>
              <NuText variant="title" weight="bold" color="#820AD1" style={styles.amountValue}>
                {formatCOPNoSpace(amount)}
              </NuText>
              <PencilIcon width={24} height={24} />
            </View>
            <NuText variant="body" weight="bold" color="#820AD1" style={styles.amountSubtitle}>
              Desde tarjeta de crédito
            </NuText>
          </View>

          <View style={styles.receiverDividerRow}>
            <View style={styles.receiverDivider} />
            <NuText variant="body" weight="regular" color="#727683" style={styles.receiverArrow}>
              ↓
            </NuText>
            <View style={styles.receiverDivider} />
          </View>

          <View style={styles.receiverSection}>
            <NuText variant="body" weight="bold" color="#820AD1" style={styles.receiverName}>
              Ma*** Sil***
            </NuText>
            <NuText variant="body" weight="bold" color="#820AD1" style={styles.receiverKey}>
              {transaction.beneficiary || '-'}
            </NuText>
            <NuText variant="body" weight="regular" color="#820AD1" style={styles.receiverBank}>
              Bancolombia
            </NuText>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <View style={styles.infoTextWrap}>
                <NuText variant="body" weight="regular" color="#727683" style={styles.infoLabel}>
                  ¿Cuándo?
                </NuText>
                <NuText variant="body" weight="bold" color="#191919" style={styles.infoValue}>
                  Tu dinero llegará en segundos
                </NuText>
              </View>
              <CalendarIcon width={24} height={24} />
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoTextWrap}>
                <NuText variant="body" weight="regular" color="#727683" style={styles.infoLabel}>
                  Vía
                </NuText>
                <NuText variant="body" weight="bold" color="#191919" style={styles.infoValue}>
                  Bre-B
                </NuText>
              </View>
              <OthersIcon width={24} height={24} />
            </View>
          </View>

          <View style={styles.paymentDetailsSection}>
            <NuText variant="title" weight="bold" color="#191919" style={styles.paymentDetailsTitle}>
              Detalles del pago
            </NuText>
          </View>

          <View style={styles.estimatedRowWrapper}>
            <Pressable onPress={() => router.back()} style={({ pressed }) => [styles.estimatedRow, pressed && styles.estimatedRowPressed]}>
              <View style={styles.estimatedTextWrap}>
                <NuText variant="body" weight="regular" color="#727683" style={styles.estimatedLabel}>
                  Pago estimado
                </NuText>
                <NuText variant="body" weight="bold" color="#191919" style={styles.estimatedValue}>
                  {installmentLabel}
                </NuText>
              </View>
              <ChevronRightIcon width={24} height={24} />
            </Pressable>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.breakdownSection}>
            <PaymentRow label="Cantidad" value={formatCOPNoSpace(amount)} />
            <PaymentRow label="Intereses estimados" value={formatCOPNoSpace(totalInterest)} />
            <PaymentRow
              label="Comisión"
              value={formatCOPNoSpace(FINANCIAL_CONSTANTS.FIXED_FEE)}
            />
            <PaymentRow label="Impuesto 4x1000" value={formatCOPNoSpace(tax4x1000)} />
            <PaymentRow label="Total a pagar" value={formatCOPNoSpace(totalWithFees)} isTotal />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerDivider} />
          <View style={styles.footerContent}>
            <View>
              <NuText variant="title" weight="bold" color="#191919" style={styles.footerTotal}>
                {formatCOPNoSpace(totalWithFees)}
              </NuText>
              <NuText variant="body" weight="regular" color="#727683" style={styles.footerLabel}>
                Costo total estimado
              </NuText>
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => router.push('/pin')}
              style={({ pressed }) => [styles.sendButton, pressed && styles.sendButtonPressed]}
            >
              <NuText variant="body" weight="bold" color="#FFFFFF" style={styles.sendButtonText}>
                Enviar
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
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
  },
  amountSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 4,
  },
  amountHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountValue: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  amountSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  receiverDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
  },
  receiverDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#DCDCDC',
  },
  receiverArrow: {
    fontSize: 24,
    lineHeight: 24,
  },
  receiverSection: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 2,
  },
  receiverName: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  receiverKey: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  receiverBank: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  infoSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  infoTextWrap: {
    flex: 1,
    gap: 4,
  },
  infoLabel: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  infoValue: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  paymentDetailsSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
  },
  paymentDetailsTitle: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  estimatedRowWrapper: {
    backgroundColor: '#FFFFFF',
  },
  estimatedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  estimatedRowPressed: {
    opacity: 0.85,
  },
  estimatedTextWrap: {
    flex: 1,
    gap: 4,
    paddingRight: 12,
  },
  estimatedLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  estimatedValue: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  breakdownSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 4,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 50,
    gap: 16,
  },
  paymentRowLabel: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
  paymentRowValue: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    textAlign: 'right',
  },
  footer: {
    backgroundColor: '#FFFFFF',
  },
  footerDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  footerTotal: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  footerLabel: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  sendButton: {
    minWidth: 122,
    height: 46,
    borderRadius: 23,
    paddingHorizontal: 24,
    backgroundColor: '#820AD1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
  sendButtonText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
  },
});
