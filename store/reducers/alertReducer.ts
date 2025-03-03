export interface AlertState {
  alerts: Array<{
    coin: string;
    price: number;
    trend: string;
    timestamp: string;
  }>;
}

const initialState: AlertState = {
  alerts: [],
};

export enum AlertActionTypes {
  ADD_ALERT = "ADD_ALERT",
}

export interface AddAlertAction {
  type: AlertActionTypes.ADD_ALERT;
  payload: { coin: string; price: number; trend: string; timestamp: string };
}

type AlertActions = AddAlertAction;

export const alertReducer = (
  state = initialState,
  action: AlertActions
): AlertState => {
  switch (action.type) {
    case AlertActionTypes.ADD_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] };
    default:
      return state;
  }
};
