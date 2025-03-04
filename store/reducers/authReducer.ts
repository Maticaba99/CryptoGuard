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
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  LOGOUT_COMPLETE = "LOGOUT_COMPLETE",
  REGISTER = "REGISTER",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
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

interface AuthLogoutSuccessAction extends Action {
  type: AuthActionTypes.LOGOUT_SUCCESS;
}

interface AuthLogoutCompleteAction extends Action {
  type: AuthActionTypes.LOGOUT_COMPLETE;
}

interface AuthRegisterAction extends Action {
  type: AuthActionTypes.REGISTER;
  payload: {
    username: string;
    email: string;
    password: string;
  };
}

interface AuthRegisterSuccessAction extends Action {
  type: AuthActionTypes.REGISTER_SUCCESS;
  payload: {
    message: string;
    user: {
      id: number;
      username: string;
      email: string;
    };
  };
}

interface AuthRegisterFailureAction extends Action {
  type: AuthActionTypes.REGISTER_FAILURE;
  payload: {
    message: string;
  };
}

export type AuthActions =
  | AuthLoginAction
  | AuthLogoutAction
  | AuthSetTokensAction
  | AuthRefreshTokenAction
  | AuthLogoutSuccessAction
  | AuthLogoutCompleteAction
  | AuthRegisterAction
  | AuthRegisterSuccessAction
  | AuthRegisterFailureAction;

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
    case AuthActionTypes.LOGOUT_SUCCESS:
      return state;
    case AuthActionTypes.LOGOUT_COMPLETE:
      return state;
    case AuthActionTypes.REGISTER_SUCCESS:
      return state;
    case AuthActionTypes.REGISTER_FAILURE:
      return state;
    default:
      return state;
  }
};
