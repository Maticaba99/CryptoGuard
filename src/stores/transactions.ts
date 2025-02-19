import { writable } from 'svelte/store';
import type { Transaction } from '../types/transaction';

function createTransactionStore() {
  const storedTransactions: Transaction[] = JSON.parse(
    localStorage.getItem('transactions') || '[]'
  );
  const { subscribe, update, set } = writable<Transaction[]>(storedTransactions);

  return {
    subscribe,
    addTransaction: (transaction: Transaction) => {
      update((items) => {
        const updatedTransactions = [...items, transaction];
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        return updatedTransactions;
      });
    },
    removeTransaction: (id: string) => {
      update((items) => {
        const updatedTransactions = items.filter((item) => item.id !== id);
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        return updatedTransactions;
      });
    },
    reset: () => {
      set([]); // Vacía la lista de transacciones
      localStorage.removeItem('transactions');
    },
  };
}

export const transactions = createTransactionStore();
