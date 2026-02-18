import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NuText from '@/src/components/NuText';
import { useTransaction } from '@/src/context/TransactionContext';
import { calculateFinancialMath } from '@/src/hooks/useFinancialMath';

import LeftArrowIcon from '@/assets/icons/Icons/Left arrow.svg';
import ChevronRightIcon from '@/assets/icons/Icons/outlined/navigation/chevron_right.svg';

const MIN_INSTALLMENTS = 1;
const MAX_INSTALLMENTS = 36;

function formatCOPNoSpace(value: number): string {
  // Figma aquí muestra "$152.131,51" (sin espacio tras $)
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

export default function CompareInstallments() {
  const router = useRouter();
  const { transaction, updateTransaction } = useTransaction();
  const amount = transaction.amount ?? 0;

  const options = useMemo(() => {
    const list: Array<{
      n: number;
      monthlyPayment: number;
      estimatedTotal: number;
    }> = [];

    for (let n = MIN_INSTALLMENTS; n <= MAX_INSTALLMENTS; n += 1) {
      const { monthlyPayment } = calculateFinancialMath(amount, n);
      const estimatedTotal = monthlyPayment * n;
      list.push({ n, monthlyPayment, estimatedTotal });
    }

    return list;
  }, [amount]);

  const handleSelect = (n: number) => {
    updateTransaction({ installments: n });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.navBar}>
          <Pressable hitSlop={8} onPress={() => router.back()} style={styles.navButton}>
            <LeftArrowIcon width={24} height={24} />
          </Pressable>
        </View>

        <View style={styles.header}>
          <NuText variant="title" weight="bold" style={styles.title}>
            Así quedarían tus cuotas
          </NuText>
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
          {options.map((opt, idx) => {
            const nLabel = opt.n === 1 ? '1 cuota' : `${opt.n} cuotas`;
            const title = `${nLabel} de ${formatCOPNoSpace(opt.monthlyPayment)}`;
            const subtitle = `Costo estimado ${formatCOPNoSpace(opt.estimatedTotal)}`;
            const showDivider = idx !== options.length - 1;

            return (
              <View key={opt.n}>
                <Pressable
                  accessibilityRole="button"
                  onPress={() => handleSelect(opt.n)}
                  style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
                >
                  <View style={styles.rowText}>
                    <NuText weight="bold" style={styles.rowTitle}>
                      {title}
                    </NuText>
                    <NuText weight="regular" style={styles.rowSubtitle}>
                      {subtitle}
                    </NuText>
                  </View>

                  <ChevronRightIcon width={24} height={24} fill="#707070" />
                </Pressable>

                {showDivider ? <View style={styles.divider} /> : null}
              </View>
            );
          })}
        </ScrollView>
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
  header: {
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  rowPressed: {
    backgroundColor: '#F5F5F5',
  },
  rowText: {
    flex: 1,
    paddingRight: 16,
    gap: 4,
  },
  rowTitle: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: -0.16,
    color: 'rgba(0,0,0,0.96)',
  },
  rowSubtitle: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.14,
    color: '#707070',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F1F5',
    marginLeft: 24,
    marginRight: 24,
  },
});

