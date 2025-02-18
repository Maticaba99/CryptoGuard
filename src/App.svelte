<script>
  import FormTransaction from './components/FormTransaction.svelte';
  import transactions from './stores/transactions';
  import { formatCurrency, formatNumber, formatDate } from './utils/formatters';
</script>

<main class="max-w-4xl mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">CryptoGuard 🚀</h1>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <h2 class="text-xl font-semibold mb-4">Nueva Transacción</h2>
      <FormTransaction />
    </div>
    
    <div>
      <h2 class="text-xl font-semibold mb-4">Transacciones Recientes</h2>
      <div class="space-y-4">
        {#each $transactions as transaction}
          <div class="bg-white p-4 rounded-lg shadow">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium">{transaction.crypto}</h3>
                <p class="text-sm text-gray-600">
                  {formatNumber(transaction.amount)} @ {formatCurrency(transaction.price)}
                </p>
                <p class="text-xs text-gray-500">{formatDate(transaction.date)}</p>
              </div>
              <div class="text-right">
                <p class="font-medium">
                  {formatCurrency(transaction.amount * transaction.price)}
                </p>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</main>