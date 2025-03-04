"use client";

import FormTransaction from "@/components/FormTransaction";
import { useTransactionStore } from "@/stores/transactions";
import { formatCurrency, formatNumber, formatDate } from "@/lib/formatters";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import type { AppDispatch, RootState } from "@/store";
import { refreshToken, setTokens, logout } from "@/store/actions/authActions";
import Cookies from "js-cookie";

export default function Dashboard() {
  const { transactions, removeTransaction } = useTransactionStore();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const [initialLoad, setInitialLoad] = useState(true);

  function handleRemove(id: string) {
    removeTransaction(id);
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    const restoreAuth = () => {
      const csrfToken = Cookies.get("_csrf")?.split("|")[0]; // Solo usamos _csrf, que no es HttpOnly

      if (csrfToken) {
        // Restaurar solo csrfToken en Redux, asumiendo que access_token y refresh_token se manejan con withCredentials
        dispatch(
          setTokens({ accessToken: null, refreshToken: null, csrfToken })
        );
      } else {
        // Si no hay _csrf, intenta refrescar para restaurar la sesión
        dispatch(refreshToken());
      }

      setInitialLoad(false);
    };

    restoreAuth();
  }, [dispatch]);

  useEffect(() => {
    if (!user && !initialLoad) {
      router.push("/login");
    } else if (user && !initialLoad) {
      dispatch(refreshToken()); // Dispara refresh para garantizar tokens actualizados
    }
  }, [user, dispatch, router, initialLoad]);

  // Escuchar LOGOUT_SUCCESS para redirigir después de completar el logout
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user, router]);

  if (!user && initialLoad) return <div>Loading...</div>; // Mostrar loading o null mientras restauramos
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">CryptoGuard 🚀</h1>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">¡Bienvenido, {user?.email}!</h2>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Cerrar Sesión
        </button>
      </div>

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
