import { useMemo } from 'react';

const EFFECTIVE_ANNUAL_RATE = 0.1845;
const MONTHLY_RATE = Math.pow(1 + EFFECTIVE_ANNUAL_RATE, 1 / 12) - 1;
const FIXED_FEE = 5000;
const TAX_4X1000_RATE = 0.004;

export type FinancialMathResult = {
  monthlyPayment: number;
  totalInterest: number;
  tax4x1000: number;
  totalWithFees: number;
};

function toSafeNumber(value: number): number {
  return Number.isFinite(value) ? value : 0;
}

export function calculateFinancialMath(amount: number, installments: number): FinancialMathResult {
  const safeAmount = Math.max(0, toSafeNumber(amount));
  const safeInstallments = Math.min(36, Math.max(1, Math.trunc(toSafeNumber(installments))));

  const denominator = 1 - Math.pow(1 + MONTHLY_RATE, -safeInstallments);
  const rawMonthlyPayment =
    denominator === 0 ? 0 : (safeAmount * MONTHLY_RATE) / denominator;

  const monthlyPayment = toSafeNumber(rawMonthlyPayment);
  const totalPaidInInstallments = monthlyPayment * safeInstallments;
  const totalInterest = toSafeNumber(totalPaidInInstallments - safeAmount);
  const tax4x1000 = toSafeNumber(safeAmount * TAX_4X1000_RATE);
  const totalWithFees = toSafeNumber(totalPaidInInstallments + tax4x1000 + FIXED_FEE);

  return {
    monthlyPayment,
    totalInterest,
    tax4x1000,
    totalWithFees,
  };
}

type UseFinancialMathParams = {
  amount: number;
  installments: number;
};

export default function useFinancialMath({
  amount,
  installments,
}: UseFinancialMathParams): FinancialMathResult {
  return useMemo(() => calculateFinancialMath(amount, installments), [amount, installments]);
}

export const FINANCIAL_CONSTANTS = {
  EFFECTIVE_ANNUAL_RATE,
  MONTHLY_RATE,
  FIXED_FEE,
  TAX_4X1000_RATE,
} as const;
