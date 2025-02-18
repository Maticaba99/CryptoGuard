import { writable } from 'svelte/store';

// Initialize store with localStorage data if available
const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
const transactions = writable(storedTransactions);

// Subscribe to changes and update localStorage
transactions.subscribe((value) => {
  localStorage.setItem('transactions', JSON.stringify(value));
});

export function addTransaction(transaction) {
  transactions.update((items) => [...items, transaction]);
}

export function removeTransaction(id) {
  transactions.update((items) => items.filter((item) => item.id !== id));
}

export default transactions;