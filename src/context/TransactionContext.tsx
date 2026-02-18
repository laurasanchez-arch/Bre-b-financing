import React, { createContext, useContext, useState, useCallback } from 'react';

export type Transaction = {
  beneficiary: string;
  amount: number | null;
  installments: number;
  paymentMethod: string | null;
};

export type TransactionHistoryItem = Transaction & {
  date: string;
};

type TransactionContextType = {
  transaction: Transaction;
  history: TransactionHistoryItem[];
  updateTransaction: (data: Partial<Transaction>) => void;
  confirmTransaction: () => void;
};

const defaultTransaction: Transaction = {
  beneficiary: '',
  amount: null,
  installments: 1,
  paymentMethod: null,
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transaction, setTransaction] = useState<Transaction>(defaultTransaction);
  const [history, setHistory] = useState<TransactionHistoryItem[]>([]);

  const updateTransaction = useCallback((data: Partial<Transaction>) => {
    setTransaction((prev) => ({ ...prev, ...data }));
  }, []);

  const confirmTransaction = useCallback(() => {
    const historyItem: TransactionHistoryItem = {
      ...transaction,
      date: new Date().toISOString(),
    };

    setHistory((prev) => [...prev, historyItem]);
    setTransaction(defaultTransaction);
  }, [transaction]);

  return (
    <TransactionContext.Provider value={{ transaction, history, updateTransaction, confirmTransaction }}>
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
