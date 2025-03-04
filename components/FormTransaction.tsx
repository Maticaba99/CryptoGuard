"use client";

import { useState, useEffect } from "react";
import { useTransactionStore } from "@/stores/transactions";
import type { Transaction } from "@/types/transaction";

interface CryptoPrices {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}

export default function FormTransaction() {
  const { addTransaction } = useTransactionStore();
  const [crypto, setCrypto] = useState<"bitcoin" | "ethereum" | "solana">(
    "bitcoin"
  );
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<number | "">("");
  const [prices, setPrices] = useState<CryptoPrices>({
    bitcoin: { usd: 0 },
    ethereum: { usd: 0 },
    solana: { usd: 0 },
  });

  async function fetchCryptoPrices() {
    try {
      /*  const response = await fetch("http://localhost:4000/crypto-prices"); */
      /* const data = await response.json(); */
      /* setPrices(data); */
    } catch (error) {
      console.error("Error fetching crypto prices:", error);
    }
  }

  useEffect(() => {
    fetchCryptoPrices(); // Cargar precios al inicio

    // Actualizar precios cada 5 minutos
    const interval = setInterval(fetchCryptoPrices, 300000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (prices[crypto]?.usd !== undefined && amount) {
      setPrice(Number(amount) * prices[crypto].usd);
    } else {
      setPrice("");
    }
  }, [crypto, amount, prices]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!amount || price === "") return;

    const transaction: Transaction = {
      id: `${crypto}-${Date.now()}`,
      crypto,
      amount: Number(amount),
      price: Number(price),
      date: new Date().toISOString(),
    };

    addTransaction(transaction);

    // Reset form
    setAmount("");
    setPrice("");
  }

  return (
    <form
      className="bg-gray-100 p-6 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="crypto" className="block mb-2 font-medium text-black">
          Criptomoneda
        </label>
        <select
          id="crypto"
          className="w-full p-2 border rounded"
          value={crypto}
          onChange={(e) =>
            setCrypto(e.target.value as "bitcoin" | "ethereum" | "solana")
          }
        >
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="solana">Solana (SOL)</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block mb-2 font-medium text-black">
          Cantidad
        </label>
        <input
          id="amount"
          type="number"
          className="w-full p-2 border rounded"
          placeholder="Ej: 0.5"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.00000001"
          min="0"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block mb-2 font-medium text-black">
          Precio de compra (USD)
        </label>
        <input
          id="price"
          type="number"
          className="w-full p-2 border rounded"
          value={price}
          step="0.01"
          min="0"
          readOnly
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
      >
        Agregar Transacción
      </button>
    </form>
  );
}
