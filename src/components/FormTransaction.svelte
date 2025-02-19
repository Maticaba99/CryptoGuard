<script lang="ts">
  import { transactions } from '../stores/transactions';
  import type { Transaction } from '../types/transaction';

  let crypto: 'BTC' | 'ETH' | 'SOL' = 'BTC';
  let amount = '';
  let price = '';

  function handleSubmit() {
    const transaction: Transaction = {
      id: `${crypto}-${Date.now()}`,
      crypto,
      amount: Number(amount),
      price: Number(price),
      date: new Date().toISOString(),
    };
    transactions.addTransaction(transaction);

    // Reset form
    amount = '';
    price = '';
  }
</script>

<form
  lang="ts"
  class="bg-gray-100 p-6 rounded-lg shadow-md"
  on:submit|preventDefault={handleSubmit}
>
  <div class="mb-4">
    <label for="crypto" class="block mb-2 font-medium">Criptomoneda</label>
    <select id="crypto" class="w-full p-2 border rounded" bind:value={crypto}>
      <option value="BTC">Bitcoin (BTC)</option>
      <option value="ETH">Ethereum (ETH)</option>
      <option value="SOL">Solana (SOL)</option>
    </select>
  </div>
  <div class="mb-4">
    <label for="amount" class="block mb-2 font-medium">Cantidad</label>
    <input
      id="amount"
      type="number"
      class="w-full p-2 border rounded"
      placeholder="Ej: 0.5"
      bind:value={amount}
      step="0.00000001"
      min="0"
      required
    />
  </div>

  <div class="mb-4">
    <label for="price" class="block mb-2 font-medium">Precio de compra (USD)</label>
    <input
      id="price"
      type="number"
      class="w-full p-2 border rounded"
      placeholder="Ej: 45000"
      bind:value={price}
      step="0.01"
      min="0"
      required
    />
  </div>

  <button
    type="submit"
    class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
  >
    Agregar Transacción
  </button>
</form>
