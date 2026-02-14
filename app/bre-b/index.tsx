import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import NuText from '@/src/components/NuText';

import BreBLogoIcon from '@/assets/icons/Icons/outlined/logos/bre_b.svg';
import HelpIcon from '@/assets/icons/Icons/help.svg';
import KeyIcon from '@/assets/icons/Icons/outlined/categories/travel/key.svg';
import ListIcon from '@/assets/icons/Icons/outlined/ui actions/common actions/list.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';
import QrCodeIcon from '@/assets/icons/Icons/qrcode.svg';
import PigInIcon from '@/assets/icons/Icons/pig_in.svg';
import SendIcon from '@/assets/icons/Icons/outlined/actions/send.svg';

type HubActionProps = {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void;
};

function HubAction({ label, icon, onPress }: HubActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.actionItem, pressed && styles.actionItemPressed]}>
      <View style={styles.actionAvatar}>{icon}</View>
      <NuText weight="bold" style={styles.actionLabel}>
        {label}
      </NuText>
    </Pressable>
  );
}

export default function BreB() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.screen}>
        <ScrollView bounces={false} contentContainerStyle={styles.scrollContent} style={styles.scroll}>
          <View style={styles.topBar}>
            <Pressable hitSlop={8} onPress={() => router.push('/')} style={styles.topBarButton}>
              <MaterialIcons color="#5C5C5C" name="close" size={28} />
            </Pressable>
            <Pressable hitSlop={8} onPress={() => undefined} style={styles.topBarButton}>
              <HelpIcon fill="#000000" height={24} width={24} />
            </Pressable>
          </View>

          <View style={styles.headerContent}>
            <NuText weight="bold" style={styles.title}>
              Bre-B
            </NuText>
            <NuText color="#5C5C5C" style={styles.subtitle}>
              Envía y recibe dinero al instante desde cualquier entidad a cualquier hora.
            </NuText>
          </View>

          <View style={styles.actionsBlock}>
            <View style={styles.actionsRow}>
              <HubAction
                icon={<SendIcon height={24} width={24} />}
                label={'Enviar con\nllaves'}
                onPress={() => router.push('/beneficiary')}
              />
              <HubAction
                icon={<PigInIcon height={24} width={24} />}
                label="Depositar"
                onPress={() => undefined}
              />
              <HubAction
                icon={<KeyIcon height={24} width={24} />}
                label="Tus llaves"
                onPress={() => undefined}
              />
            </View>

            <View style={styles.actionsRow}>
              <HubAction
                icon={<QrCodeIcon height={24} width={24} />}
                label="Código QR"
                onPress={() => undefined}
              />
              <HubAction
                icon={<ListIcon height={24} width={24} />}
                label="Movimientos"
                onPress={() => undefined}
              />
              <HubAction
                icon={<HelpIcon fill="#000000" height={24} width={24} />}
                label="Necesito ayuda"
                onPress={() => undefined}
              />
            </View>
          </View>

          <View style={styles.calloutWrap}>
            <View style={styles.calloutCard}>
              <NuText weight="bold" style={styles.calloutTitle}>
                Descubre tu zona Bre-B
              </NuText>
              <NuText color="#5C5C5C" style={styles.calloutBody}>
                Registra y gestiona tus llaves. Envía dinero gratis de forma instantánea. {'\n'}
                Todo desde un solo lugar.
              </NuText>
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.footerLogos}>
            <BreBLogoIcon height={24} width={54} />
            <View style={styles.footerDivider} />
            <NuLogoIcon height={24} width={30} />
          </View>
          <View style={styles.homeIndicator} />
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
  screen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
  },
  topBarButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    rowGap: 8,
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
  actionsBlock: {
    paddingTop: 8,
    rowGap: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  actionItem: {
    width: 103,
    minHeight: 152,
    alignItems: 'center',
    paddingVertical: 16,
    rowGap: 12,
  },
  actionItemPressed: {
    opacity: 0.8,
  },
  actionAvatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    textAlign: 'center',
    color: '#000000',
  },
  calloutWrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  calloutCard: {
    backgroundColor: '#ECD9FF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 20,
    rowGap: 4,
  },
  calloutTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#000000',
  },
  calloutBody: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    rowGap: 18,
    backgroundColor: '#FFFFFF',
  },
  footerLogos: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  footerDivider: {
    width: 1,
    height: 26,
    backgroundColor: '#030303',
  },
  homeIndicator: {
    width: 140,
    height: 5,
    borderRadius: 64,
    backgroundColor: '#111111',
  },
});
