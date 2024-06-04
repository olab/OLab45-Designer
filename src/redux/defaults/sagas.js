import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getEdgeDefaults, getNodeDefaults, getGroups, getRoles } from '../../services/api/defaults';

import { USER_AUTH_SUCCEEDED } from '../login/types';

import { ACTION_NOTIFICATION_ERROR } from '../notifications/action';
import { ACTION_SET_DEFAULTS } from './action';

function* getDefaultsSaga() {
  try {
    const [edgeBody, nodeBody, groups, roles] = yield all([
      call(getEdgeDefaults),
      call(getNodeDefaults),
      call(getGroups),
      call(getRoles),
    ]);

    yield put(ACTION_SET_DEFAULTS(edgeBody, nodeBody, groups, roles));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* defaultsSaga() {
  yield takeLatest(USER_AUTH_SUCCEEDED, getDefaultsSaga);
}

export default defaultsSaga;
