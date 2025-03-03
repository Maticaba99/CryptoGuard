import { put, takeEvery, call, select } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AlertActionTypes } from "../reducers/alertReducer";
import { AuthState } from "../reducers/authReducer";

interface FetchResponse {
  coin: string;
  price: number;
  trend: string;
}

function* fetchPricesSaga() {
  try {
    const { accessToken }: AuthState = yield select((state: any) => state.auth);
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "http://localhost:3000/prices/enrich",
      withCredentials: true, // Para enviar access_token en cookies
    };

    const response: AxiosResponse<FetchResponse> = yield call(
      (config: AxiosRequestConfig) => axios.request<FetchResponse>(config),
      config
    );
    const { coin, price, trend } = response.data;
    yield put({
      type: AlertActionTypes.ADD_ALERT,
      payload: { coin, price, trend, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    console.error("Error fetching prices:", error);
  }
}

export function* priceSaga() {
  yield takeEvery("FETCH_PRICES", fetchPricesSaga);
}
