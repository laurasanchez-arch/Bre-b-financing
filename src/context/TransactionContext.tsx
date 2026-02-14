import React, { createContext, useContext, useState, useCallback } from 'react';

export type Transaction = {
  beneficiary: string;
  amount: number | null;
  installments: number | null;
  paymentMethod: string | null;
};

type TransactionContextType = {
  transaction: Transaction;
  updateTransaction: (data: Partial<Transaction>) => void;
};

const defaultTransaction: Transaction = {
  beneficiary: '',
  amount: null,
  installments: null,
  paymentMethod: null,
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transaction, setTransaction] = useState<Transaction>(defaultTransaction);

  const updateTransaction = useCallback((data: Partial<Transaction>) => {
    setTransaction((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <TransactionContext.Provider value={{ transaction, updateTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction() {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
}
