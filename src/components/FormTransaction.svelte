<script lang="ts">
  import { transactions } from '../stores/transactions';
  import type { Transaction } from '../types/transaction';
  import { onMount } from 'svelte';

  let prices: { bitcoin: { usd: number }; ethereum: { usd: number }; solana: { usd: number } } = {
    bitcoin: {
      usd: 0,
    },
    ethereum: {
      usd: 0,
    },
    solana: {
      usd: 0,
    },
  };

  async function fetchCryptoPrices() {
    try {
      const response = await fetch('http://localhost:3000/crypto-prices');
      prices = await response.json();
    } catch (error) {
      console.error('Error fetching crypto prices:', error);
    }
  }

  onMount(() => {
    fetchCryptoPrices(); // Cargar precios al inicio

    // Actualizar precios cada 5 minutos
    setInterval(fetchCryptoPrices, 300000);
  });

  console.log(prices, 'prices');

  let crypto: 'bitcoin' | 'ethereum' | 'solana' = 'bitcoin';
  let amount = '';
  let price: number | '' = '';
  $: price = prices[crypto]?.usd !== undefined ? Number(amount) * prices[crypto].usd : '';

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
    <label for="crypto" class="block mb-2 font-medium text-black">Criptomoneda</label>
    <select id="crypto" class="w-full p-2 border rounded" bind:value={crypto}>
      <option value="bitcoin">Bitcoin (BTC)</option>
      <option value="ethereum">Ethereum (ETH)</option>
      <option value="solana">Solana (SOL)</option>
    </select>
  </div>
  <div class="mb-4">
    <label for="amount" class="block mb-2 font-medium text-black">Cantidad</label>
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
    <label for="price" class="block mb-2 font-medium text-black">Precio de compra (USD)</label>
    <input
      id="price"
      type="number"
      class="w-full p-2 border rounded"
      bind:value={price}
      step="0.01"
      min="0"
      readonly
    />
  </div>

  <button
    type="submit"
    class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
  >
    Agregar Transacción
  </button>
</form>
