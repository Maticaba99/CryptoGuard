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

export const register = (credentials: {
  username: string;
  email: string;
  password: string;
}) => ({
  type: AuthActionTypes.REGISTER,
  payload: credentials,
});

export const registerSuccess = (data: {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}) => ({
  type: AuthActionTypes.REGISTER_SUCCESS,
  payload: data,
});

export const registerFailure = (message: string) => ({
  type: AuthActionTypes.REGISTER_FAILURE,
  payload: { message },
});
