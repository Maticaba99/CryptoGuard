import { put, takeEvery, call, select, take } from "redux-saga/effects";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthActionTypes, AuthState } from "../reducers/authReducer";
import { setTokens, logout, fetchCsrfToken } from "../actions/authActions";
import { Action } from "redux";
import type { RootState } from "../index";

interface LoginAction extends Action {
  type: AuthActionTypes.LOGIN;
  payload: { email: string; password: string }; // Coincide con lo que envía authActions.ts
}

type GeneratorType = Generator<any, void, any>;

interface CsrfResponse {
  csrfToken: string;
}

interface FetchResponse {
  message: string;
  csrfToken: string;
}

function* fetchCsrfTokenSaga(): GeneratorType {
  try {
    const response: AxiosResponse<CsrfResponse> = yield call(() =>
      axios.get("/api/auth/csrf", { withCredentials: true })
    );
    const { csrfToken } = response.data;

    yield put(setTokens({ accessToken: null, refreshToken: null, csrfToken }));
  } catch (error) {
    console.error("Failed to fetch CSRF token:", error);
  }
}

function* loginSaga(action: LoginAction): GeneratorType {
  try {
    const { email, password } = action.payload;
    let { csrfToken }: AuthState = yield select(
      (state: RootState) => state.auth
    );

    if (!csrfToken) {
      yield put({ type: AuthActionTypes.FETCH_CSRF_TOKEN });
      yield take(AuthActionTypes.SET_TOKENS);
      const updatedState: RootState = yield select((state: RootState) => state);
      csrfToken = updatedState.auth.csrfToken;
      if (!csrfToken) throw new Error("CSRF Token still missing after fetch");
    }

    const response: AxiosResponse<FetchResponse> = yield call(() =>
      axios.post(
        "/api/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "X-CSRF-Token": csrfToken as string },
        }
      )
    );

    if (response.status === 200) {
      const { message } = response.data;
      yield put({
        type: AuthActionTypes.LOGIN,
        payload: {
          user: { email },
          csrfToken,
          accessToken: null,
          refreshToken: null,
        },
      });

      // Asegúrate de fetchear un nuevo csrfToken después del login
      yield put({ type: AuthActionTypes.FETCH_CSRF_TOKEN });
      yield take(AuthActionTypes.SET_TOKENS);
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
}

function* refreshTokenSaga(): GeneratorType {
  try {
    const state: RootState = yield select();
    let { csrfToken }: AuthState = state.auth;

    if (!csrfToken) {
      yield put({ type: AuthActionTypes.FETCH_CSRF_TOKEN });
      yield take(AuthActionTypes.SET_TOKENS);
      const updatedState: RootState = yield select();
      csrfToken = updatedState.auth.csrfToken;
      if (!csrfToken) throw new Error("CSRF Token still missing after fetch");
    }

    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/api/auth/refresh",
      headers: { "X-CSRF-Token": csrfToken as string },
      withCredentials: true,
    };
    const response: AxiosResponse<FetchResponse> = yield call(
      (config: AxiosRequestConfig) => axios.request<FetchResponse>(config),
      config
    );
    if (response.status === 200) {
      // Fetches a new CSRF token after refresh to ensure it's updated
      yield put({ type: AuthActionTypes.FETCH_CSRF_TOKEN });
      yield take(AuthActionTypes.SET_TOKENS);
    }
  } catch (error) {
    yield put(logout());
    console.error("Refresh failed:", error);
  }
}

function* logoutSaga(): GeneratorType {
  try {
    const state: RootState = yield select();

    const response: AxiosResponse<FetchResponse> = yield call(() =>
      axios.post("/api/auth/logout", {
        withCredentials: true,
      })
    );

    if (response.status === 200) {
      document.cookie = "_csrf=; Max-Age=0; Path=/; SameSite=Strict";
      yield put(logout());

      // Fecthear un nuevo csrfToken y esperar a que se actualice en Redux
      yield put(fetchCsrfToken());
      yield take(AuthActionTypes.SET_TOKENS); // Esperar a que el csrfToken se actualice antes de continuar

      // Notificar al componente que el logout está completo con un nuevo csrfToken
      yield put({ type: AuthActionTypes.LOGOUT_COMPLETE }); // Nueva acción para indicar que el logout y el nuevo csrfToken están listos
    }
  } catch (error) {
    console.error("Logout failed:", error);
    yield put(logout()); // Still logout locally even if server request fails
  }
}

export function* authSaga() {
  yield takeEvery(AuthActionTypes.FETCH_CSRF_TOKEN, fetchCsrfTokenSaga);
  yield takeEvery(AuthActionTypes.LOGIN, loginSaga);
  yield takeEvery(AuthActionTypes.REFRESH_TOKEN, refreshTokenSaga);
  yield takeEvery(AuthActionTypes.LOGOUT, logoutSaga);
}
