import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

import NuText from '@/src/components/NuText';

import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import HelpIcon from '@/assets/icons/Icons/help.svg';
import KeyIcon from '@/assets/icons/Icons/outlined/categories/travel/key.svg';
import NuLogoIcon from '@/assets/icons/Icons/outlined/logos/nu_logo.svg';
import BankIcon from '@/assets/icons/Icons/outlined/objects/building/bank.svg';

type ListRowProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  onPress?: () => void;
  showDivider?: boolean;
};

function ListRow({ icon, title, subtitle, badge, onPress, showDivider = true }: ListRowProps) {
  return (
    <>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.listRow, pressed && styles.listRowPressed]}
      >
        <View style={styles.avatar}>{icon}</View>
        <View style={styles.listRowContent}>
          <View style={styles.listRowTitleRow}>
            <NuText weight="bold" style={styles.listRowTitle}>
              {title}
            </NuText>
          </View>
          <NuText color="#727683" style={styles.listRowSubtitle}>
            {subtitle}
          </NuText>
        </View>
        {badge ? (
          <View style={styles.badge}>
            <NuText color="#FFFFFF" weight="bold" style={styles.badgeText}>
              {badge}
            </NuText>
          </View>
        ) : null}
        <MaterialIcons color="#191919" name="navigate-next" size={24} />
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

export default function SendOptions() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Pressable hitSlop={8} onPress={() => router.back()} style={styles.topBarButton}>
          <LeftArrowIcon height={24} width={24} />
        </Pressable>
        <Pressable hitSlop={8} onPress={() => undefined} style={styles.topBarButton}>
          <HelpIcon fill="#000000" height={24} width={24} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} style={styles.scroll}>
        {/* Title */}
        <View style={styles.titleWrap}>
          <NuText weight="bold" style={styles.title}>
            ¿Cómo quieres hacer el envío?
          </NuText>
        </View>

        {/* Section: Puedes hacerlo a */}
        <View style={styles.sectionTitleWrap}>
          <NuText weight="bold" style={styles.sectionTitle}>
            Puedes hacerlo a
          </NuText>
        </View>

        {/* Option 1: Otras entidades financieras con llaves (Bre-B) */}
        <ListRow
          icon={<KeyIcon height={24} width={24} />}
          title="Otras entidades financieras con llaves"
          subtitle="Es inmediata y gratis."
          badge="Bre-B"
          onPress={() => router.push('/beneficiary')}
        />

        {/* Option 2: Clientes Nu */}
        <ListRow
          icon={<NuLogoIcon height={24} width={24} />}
          title="Clientes Nu"
          subtitle="Es inmediata y gratis."
          onPress={() => undefined}
        />

        {/* Option 3: Otras entidades financieras */}
        <ListRow
          icon={<BankIcon height={24} width={24} />}
          title="Otras entidades financieras"
          subtitle="Puede demorar 2 días."
          onPress={() => undefined}
          showDivider={false}
        />

        {/* Section: Contactos previos */}
        <View style={styles.sectionTitleWrap}>
          <NuText weight="bold" style={styles.sectionTitle}>
            Contactos previos
          </NuText>
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
    paddingHorizontal: 16,
    height: 56,
  },
  topBarButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  titleWrap: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.84,
    color: '#000000',
  },
  sectionTitleWrap: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#5C5C5C', // Content/Subtle
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  listRowPressed: {
    backgroundColor: '#F5F5F5',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listRowContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 8,
    rowGap: 2,
  },
  listRowTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
    flexWrap: 'wrap',
  },
  listRowTitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#000000',
  },
  listRowSubtitle: {
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
  },
  badge: {
    backgroundColor: '#820AD1',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 8,
  },
  badgeText: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E6E6E6',
    marginLeft: 80,
    marginRight: 24,
  },
});
