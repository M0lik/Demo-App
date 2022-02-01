import { all, fork, put, takeEvery } from "redux-saga/effects";

import { loginUser, loginSuccess, loginFailed } from "./userSlice";
import { authApi } from "../../api/auth";

function* loginWithEmailPassword({ payload }) {
  const { username, password } = payload;
  const access_token = yield authApi.login(username, password);
  const user = yield authApi.getUser(access_token);
  const value = { access_token, ...user };
  try {
    if (value) {
      yield put(loginSuccess(value));
    } else {
      yield put(loginFailed());
    }
  } catch (error) {
    console.error("login error : ", error);
  }
}

export function* watchLoginUser() {
  yield takeEvery(loginUser.type, loginWithEmailPassword);
}

export default function* rootSaga() {
  yield all([fork(watchLoginUser)]);
}
