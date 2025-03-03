import { Action } from "redux";

export interface AuthState {
  user: { email: string } | null;
  csrfToken: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  csrfToken: null,
  accessToken: null,
  refreshToken: null,
};

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SET_TOKENS = "SET_TOKENS",
  FETCH_CSRF_TOKEN = "FETCH_CSRF_TOKEN",
  REFRESH_TOKEN = "REFRESH_TOKEN",
}

interface AuthLoginAction extends Action {
  type: AuthActionTypes.LOGIN;
  payload: {
    user: { email: string };
    csrfToken: string;
    accessToken: string;
    refreshToken: string;
  };
}

interface AuthLogoutAction extends Action {
  type: AuthActionTypes.LOGOUT;
}

interface AuthSetTokensAction extends Action {
  type: AuthActionTypes.SET_TOKENS;
  payload: { accessToken: string; refreshToken: string; csrfToken: string };
}

interface AuthRefreshTokenAction extends Action {
  type: AuthActionTypes.REFRESH_TOKEN;
}

export type AuthActions =
  | AuthLoginAction
  | AuthLogoutAction
  | AuthSetTokensAction
  | AuthRefreshTokenAction;

export const authReducer = (
  state = initialState,
  action: AuthActions
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        csrfToken: action.payload.csrfToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    case AuthActionTypes.SET_TOKENS:
      return {
        ...state,
        csrfToken: action.payload.csrfToken,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    default:
      return state;
  }
};
