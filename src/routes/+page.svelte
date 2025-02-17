<script>
  let crypto = "BTC";
  let amount = "";
  let price = "";
</script>

<main class="max-w-2xl mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">CryptoGuard 🚀</h1>
  
  <form class="bg-gray-100 p-6 rounded-lg shadow-md">
    <div class="mb-4">
      <label class="block mb-2 font-medium">Criptomoneda</label>
      <select 
        class="w-full p-2 border rounded"
        bind:value={crypto}
      >
        <option value="BTC">Bitcoin (BTC)</option>
        <option value="ETH">Ethereum (ETH)</option>
        <option value="SOL">Solana (SOL)</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block mb-2 font-medium">Cantidad</label>
      <input
        type="number"
        class="w-full p-2 border rounded"
        placeholder="Ej: 0.5"
        bind:value={amount}
      />
    </div>

    <div class="mb-4">
      <label class="block mb-2 font-medium">Precio de compra (USD)</label>
      <input
        type="number"
        class="w-full p-2 border rounded"
        placeholder="Ej: 45000"
        bind:value={price}
      />
    </div>

    <button
      class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      on:click|preventDefault={() => console.log({ crypto, amount, price })}
    >
      Agregar Transacción
    </button>
  </form>
</main>