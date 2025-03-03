import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { priceSaga } from "./priceSaga";

export default function* rootSaga() {
  yield all([authSaga(), priceSaga()]);
}
