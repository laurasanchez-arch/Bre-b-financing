import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import NuText from '@/src/components/NuText';

import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import HelpIcon from '@/assets/icons/Icons/help.svg';
import SettingsIcon from '@/assets/icons/Icons/outlined/actions/settings.svg';
import CardCollateralIcon from '@/assets/icons/Icons/outlined/financial/cards/card_collateral.svg';
import DollarSignIcon from '@/assets/icons/Icons/outlined/financial/other/dollar_sign.svg';
import HorizontalCardIcon from '@/assets/icons/Icons/outlined/financial/cards/horizontal_card.svg';
import RefinanceIcon from '@/assets/icons/Icons/outlined/financial/other/refinance.svg';

type DashActionProps = {
  label: string;
  icon: React.ReactNode;
  badge?: string;
  onPress?: () => void;
};

function DashAction({ label, icon, badge, onPress }: DashActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionItem, pressed && styles.actionItemPressed]}>
      <View style={styles.actionAvatar}>
        {icon}
        {badge ? (
          <View style={styles.badgeWrap}>
            <View style={styles.badge}>
              <NuText color="#FFFFFF" weight="bold" style={styles.badgeText}>
                {badge}
              </NuText>
            </View>
          </View>
        ) : null}
      </View>
      <NuText weight="bold" style={styles.actionLabel}>
        {label}
      </NuText>
    </Pressable>
  );
}

export default function CreditCardDashboard() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={() => router.push('/')} style={styles.topBarButton}>
          <LeftArrowIcon height={24} width={24} />
        </Pressable>
        <NuText weight="bold" style={styles.topBarTitle}>
          Tarjeta de crédito
        </NuText>
        <View style={styles.topBarRight}>
          <Pressable hitSlop={8} onPress={() => undefined} style={styles.topBarButton}>
            <HelpIcon fill="#000000" height={20} width={20} />
          </Pressable>
          <Pressable hitSlop={8} onPress={() => undefined} style={styles.topBarButton}>
            <SettingsIcon fill="#000000" height={20} width={20} />
          </Pressable>
        </View>
      </View>

      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent} style={styles.scroll}>
        {/* Product Snapshot */}
        <View style={styles.snapshot}>
          <NuText weight="bold" style={styles.snapshotLabel}>
            Deuda total
          </NuText>
          <View style={styles.amountRow}>
            <NuText weight="bold" style={styles.amountInteger}>
              $500.356,
            </NuText>
            <NuText weight="bold" style={styles.amountDecimal}>
              62
            </NuText>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressBar}>
            <View style={styles.progressGray} />
            <View style={styles.progressPurple} />
          </View>

          {/* Info Fields */}
          <View style={styles.infoFields}>
            <NuText style={styles.infoText}>
              <NuText color="#5C5C5C" style={styles.infoText}>Cupo disponible · </NuText>
              <NuText weight="bold" style={styles.infoText}>$1'000.000,00</NuText>
            </NuText>
            <NuText style={styles.infoText}>
              <NuText color="#5C5C5C" style={styles.infoText}>Fecha de corte · </NuText>
              <NuText weight="bold" style={styles.infoText}>07 MAR</NuText>
            </NuText>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <DashAction
            icon={<CardCollateralIcon fill="#000000" height={24} width={24} />}
            label={'Avances\ncon Bre-B'}
            badge="Nuevo"
            onPress={() => router.push('/beneficiary')}
          />
          <DashAction
            icon={<DollarSignIcon fill="#000000" height={24} width={24} />}
            label={'Avances a\ncuenta'}
            onPress={() => undefined}
          />
          <DashAction
            icon={<HorizontalCardIcon fill="#000000" height={24} width={24} />}
            label={'Mis\ntarjetas'}
            onPress={() => undefined}
          />
          <DashAction
            icon={<RefinanceIcon fill="#000000" height={24} width={24} />}
            label={'Gestionar\ndeuda'}
            onPress={() => undefined}
          />
        </View>

        {/* Transaction Feed */}
        <View style={styles.feedSection}>
          <View style={styles.feedTitleWrap}>
            <NuText color="#5C5C5C" style={styles.feedTitle}>
              Hoy
            </NuText>
          </View>

          <View style={styles.feedDivider} />

          {/* Transaction Row */}
          <View style={styles.transactionRow}>
            <View style={styles.transactionAvatar}>
              <HorizontalCardIcon fill="#0C7A3A" height={24} width={24} />
            </View>
            <View style={styles.transactionContent}>
              <NuText weight="bold" style={styles.transactionTitle}>
                ¡Gracias por tu pago!
              </NuText>
              <NuText color="#5C5C5C" style={styles.transactionSubtitle}>
                Pagaste $66.550,00
              </NuText>
            </View>
          </View>

          <View style={styles.feedDividerFull} />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  topBarButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarTitle: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
    color: '#000000',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  snapshot: {
    paddingLeft: 24,
    paddingRight: 16,
    paddingVertical: 48,
    rowGap: 8,
  },
  snapshotLabel: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
    color: '#000000',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  amountInteger: {
    fontSize: 36,
    lineHeight: 40,
    letterSpacing: -1.08,
    color: '#000000',
  },
  amountDecimal: {
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: -0.48,
    color: '#000000',
  },
  progressBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 999,
    overflow: 'hidden',
    columnGap: 2,
    marginTop: 8,
  },
  progressGray: {
    flex: 1,
    backgroundColor: '#909090',
    borderRadius: 999,
  },
  progressPurple: {
    flex: 1,
    backgroundColor: '#820AD1',
    borderRadius: 999,
  },
  infoFields: {
    rowGap: 4,
    marginTop: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    columnGap: 4,
  },
  actionItem: {
    flex: 1,
    alignItems: 'center',
    rowGap: 12,
  },
  actionItemPressed: {
    opacity: 0.8,
  },
  actionAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeWrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
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
    letterSpacing: 0,
  },
  actionLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    textAlign: 'center',
    color: '#000000',
  },
  feedSection: {
    marginTop: 8,
  },
  feedTitleWrap: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  feedTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  feedDivider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginHorizontal: 24,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    columnGap: 16,
  },
  transactionAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DDF5E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionContent: {
    flex: 1,
    rowGap: 4,
  },
  transactionTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#000000',
  },
  transactionSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
  },
  feedDividerFull: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginHorizontal: 24,
  },
});
