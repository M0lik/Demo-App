import { all, fork, put, takeEvery } from "redux-saga/effects";

import { loginUser, loginSuccess, loginFailed } from "./userSlice";
import { authApi } from "../../api/auth";

function* loginWithEmailPassword({ payload }) {
  const { username, password } = payload;
  const access_token = yield authApi.login(username, password);
  if (access_token === null) return yield put(loginFailed());
  const user = yield authApi.getUser(access_token);
  if (user === null) return yield put(loginFailed());
  const value = { access_token, ...user };
  return yield put(loginSuccess(value));
}

export function* watchLoginUser() {
  yield takeEvery(loginUser.type, loginWithEmailPassword);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
