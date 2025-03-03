import { configureStore, combineReducers, ThunkAction } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Usa localStorage para persistencia
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas";
import { authReducer, AuthState, AuthActions } from "./reducers/authReducer";
import {
  alertReducer,
  AlertState,
  AddAlertAction,
} from "./reducers/alertReducer";

// Define el estado raíz combinado
export interface RootState {
  auth: AuthState;
  alerts: AlertState;
}

// Tipos para las acciones combinadas
export type CombinedActions = AuthActions | AddAlertAction; // Usamos AnyAction para más flexibilidad

// Combina los reducers sin tipar explícitamente las acciones (usa inferencia de tipos)
const rootReducer = combineReducers({
  auth: authReducer,
  alerts: alertReducer,
});

// Configuración para redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Solo persiste el estado auth (alerts no se persiste si no lo necesitas)
};

// Crea el reducer persistente con tipos explícitos
// Usamos solo RootState como tipo, sin especificar acciones explícitas
const persistedReducer = persistReducer<RootState>(
  persistConfig,
  rootReducer as any
);
// Crea el middleware de saga
const sagaMiddleware = createSagaMiddleware();

// Configura la store con tipos explícitos
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desactiva la verificación de serializabilidad para objetos complejos como tokens
      immutableCheck: false, // Desactiva la verificación de inmutabilidad si usas objetos mutables
    }).concat(sagaMiddleware),
});

// Crea el persistor con tipos explícitos
export const persistor = persistStore(store);

// Ejecuta las sagas
sagaMiddleware.run(rootSaga);

// Tipos para dispatch y selectors
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, CombinedActions>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
