"use client";

import FormTransaction from "@/components/FormTransaction";
import { useTransactionStore } from "@/stores/transactions";
import { formatCurrency, formatNumber, formatDate } from "@/lib/formatters";

export default function Home() {
  const { transactions, removeTransaction } = useTransactionStore();

  function handleRemove(id: string) {
    console.log("Removing transaction", id);
    removeTransaction(id);
  }

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CryptoGuard 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Nueva Transacción</h2>
          <FormTransaction />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            Transacciones Recientes
          </h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-lg shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-600">
                      {transaction.crypto}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {formatNumber(transaction.amount)} @{" "}
                      {formatCurrency(transaction.price)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-black">
                      {formatCurrency(transaction.amount * transaction.price)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(transaction.id)}
                    className="text-black"
                    aria-label="Remove transaction"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
