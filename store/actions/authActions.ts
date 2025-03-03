import { AuthActionTypes } from "../reducers/authReducer";

export const login = (credentials: { email: string; password: string }) => ({
  type: AuthActionTypes.LOGIN,
  payload: credentials,
});

export const logout = () => ({
  type: AuthActionTypes.LOGOUT,
});

export const setTokens = (tokens: {
  accessToken: string | null;
  refreshToken: string | null;
  csrfToken: string;
}) => ({
  type: AuthActionTypes.SET_TOKENS,
  payload: tokens,
});

export const fetchCsrfToken = () => ({
  type: AuthActionTypes.FETCH_CSRF_TOKEN,
});

export const refreshToken = () => ({
  type: AuthActionTypes.REFRESH_TOKEN,
});
