import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { SvgProps } from 'react-native-svg';

import NuButton from '@/src/components/NuButton';
import NuText from '@/src/components/NuText';

import HelpIcon from '@/assets/icons/Icons/help.svg';
import KidAdultIcon from '@/assets/icons/Icons/Kid adult.svg';
import ReceiptIcon from '@/assets/icons/Icons/Icon - Optional.svg';
import PigInIcon from '@/assets/icons/Icons/pig_in.svg';
import QrCodeIcon from '@/assets/icons/Icons/qrcode.svg';
import UserIcon from '@/assets/icons/Icons/user.svg';
import VisibilityOnIcon from '@/assets/icons/Icons/visibility_on.svg';
import BreBIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import SendIcon from '@/assets/icons/Icons/outlined/actions/send.svg';

type ActionItemProps = {
  label: string;
  icon: React.ReactNode;
  badge?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

type HeaderActionProps = {
  icon: React.ComponentType<SvgProps>;
  onPress?: () => void;
};

function HeaderAction({ icon: Icon, onPress }: HeaderActionProps) {
  return (
    <Pressable hitSlop={8} onPress={onPress} style={styles.headerActionButton}>
      <Icon fill="white" height={24} width={24} />
    </Pressable>
  );
}

function ActionItem({ label, icon, badge, containerStyle }: ActionItemProps) {
  return (
    <Pressable onPress={() => undefined} style={[styles.actionItem, containerStyle]}>
      <View style={styles.actionAvatar}>
        {icon}
        {badge ? (
          <View style={styles.badgeWrapper}>
            <View style={styles.badge}>
              <NuText color="#FFFFFF" style={styles.badgeText} weight="bold">
                {badge}
              </NuText>
            </View>
          </View>
        ) : null}
      </View>
      <NuText style={styles.actionLabel} weight="bold">
        {label}
      </NuText>
    </Pressable>
  );
}

export default function Home() {
  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView bounces={false} contentContainerStyle={styles.scrollContent} style={styles.screen}>
        <View style={styles.header}>
          <View style={styles.headerTopBar}>
            <Pressable onPress={() => undefined} style={styles.profileCircle}>
              <UserIcon height={24} width={24} />
            </Pressable>
            <View style={styles.headerActions}>
              <HeaderAction icon={VisibilityOnIcon} />
              <HeaderAction icon={HelpIcon} />
              <HeaderAction icon={KidAdultIcon} />
            </View>
          </View>
          <View style={styles.headerTitleWrap}>
            <NuText color="#FFFFFF" style={styles.headerTitle} weight="bold">
              Hola, Ariel
            </NuText>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <NuText style={styles.sectionTitle} weight="bold">
              Cuenta de ahorros
            </NuText>
            <MaterialIcons color="#191919" name="navigate-next" size={24} />
          </View>

          <View style={styles.accountContent}>
            <NuText style={styles.amountValue} weight="bold">
              $340.800,00
            </NuText>
            <NuText color="#727683" style={styles.amountHelper}>
              Abre tu caijta para que tu dinero crezca al 11,0% E.A.
            </NuText>
          </View>

          <View style={styles.actionsViewport}>
            <ScrollView
              horizontal
              contentContainerStyle={styles.actionsRow}
              showsHorizontalScrollIndicator={false}>
              <ActionItem
                icon={<PigInIcon height={24} width={24} />}
                label="Depositar"
              />
              <ActionItem
                icon={<SendIcon height={24} width={24} />}
                label="Enviar"
              />
              <ActionItem
                badge="Tus llaves"
                icon={<BreBIcon height={24} width={24} />}
                label="Bre-B"
              />
              <ActionItem
                icon={<QrCodeIcon height={24} width={24} />}
                label="Pagar con código QR"
                containerStyle={styles.longActionItem}
              />
              <ActionItem
                icon={<MaterialIcons color="#191919" name="payments" size={24} />}
                label="Pagar"
              />
            </ScrollView>
          </View>
        </View>

        <View style={styles.pillOuter}>
          <Pressable onPress={() => undefined} style={styles.pillCard}>
            <View style={styles.pillLeft}>
              <ReceiptIcon height={24} width={24} />
              <NuText style={styles.pillLabel} weight="bold">
                Detalles de mi cuenta
              </NuText>
            </View>
            <MaterialIcons color="#727683" name="navigate-next" size={24} />
          </Pressable>
        </View>

        <View style={styles.divider} />

        <View style={styles.sectionBlock}>
          <View style={styles.sectionHeader}>
            <NuText style={styles.sectionTitle} weight="bold">
              Tarjeta de crédito
            </NuText>
            <MaterialIcons color="#191919" name="navigate-next" size={24} />
          </View>

          <View style={styles.creditContent}>
            <NuText color="#727683" style={styles.creditSubtitle} weight="bold">
              Deuda total hasta la fecha
            </NuText>
            <NuText style={styles.amountValue} weight="bold">
              $500.356,62
            </NuText>
            <NuText color="#636363" style={styles.creditDetails}>
              Fecha de corte: 05 JUN{'\n'}Cupo disponible: $2.000,00
            </NuText>
          </View>

          <View style={styles.payButtonWrap}>
            <NuButton onPress={() => undefined} title="Pagar" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#820AD1',
  },
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  header: {
    backgroundColor: '#820AD1',
  },
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  profileCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#981AE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerActionButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleWrap: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: -0.18,
  },
  sectionBlock: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: '#000000',
  },
  accountContent: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
    rowGap: 4,
  },
  amountValue: {
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.48,
    color: '#000000',
  },
  amountHelper: {
    fontSize: 12,
    lineHeight: 16,
    color: '#000000',
    opacity: 0.64,
  },
  actionsViewport: {
    height: 152,
  },
  actionsRow: {
    flexDirection: 'row',
    columnGap: 4,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  actionItem: {
    width: 80,
    alignItems: 'center',
    rowGap: 12,
  },
  longActionItem: {
    width: 84,
  },
  actionAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E7E7E7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  badge: {
    minHeight: 20,
    borderRadius: 4,
    backgroundColor: '#820AD1',
    paddingHorizontal: 4,
    paddingVertical: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  actionLabel: {
    width: '100%',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    textAlign: 'center',
    color: '#000000',
  },
  pillOuter: {
    paddingHorizontal: 24,
  },
  pillCard: {
    minHeight: 56,
    borderRadius: 12,
    backgroundColor: '#EFEFEF',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pillLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  pillLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginTop: 24,
  },
  creditContent: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 24,
    rowGap: 8,
  },
  creditSubtitle: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.16,
    color: '#727683',
  },
  creditDetails: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.14,
    color: '#000000',
    opacity: 0.64,
  },
  payButtonWrap: {
    width: 92,
    marginLeft: 24,
    marginTop: 8,
  },
});
