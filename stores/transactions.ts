import { create } from 'zustand';
import type { Transaction } from '@/types/transaction';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  reset: () => void;
}

// Helper to safely use localStorage (only on client side)
const getStoredTransactions = (): Transaction[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('transactions');
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error parsing stored transactions:', error);
    return [];
  }
};

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: getStoredTransactions(),
  
  addTransaction: (transaction) => 
    set((state) => {
      const updatedTransactions = [...state.transactions, transaction];
      if (typeof window !== 'undefined') {
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      }
      return { transactions: updatedTransactions };
    }),
  
  removeTransaction: (id) => 
    set((state) => {
      const updatedTransactions = state.transactions.filter((item) => item.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      }
      return { transactions: updatedTransactions };
    }),
  
  reset: () => 
    set(() => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('transactions');
      }
      return { transactions: [] };
    }),
}));