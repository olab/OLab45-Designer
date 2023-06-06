import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getMapSecurityUsers,
  updateMapSecurityUsers,
  deleteMapSecurityUsers,
} from '../../services/api/mapSecurityUsers';

import {
  ACTION_GET_MAP_SECURITY_USERS_FAILED,
  ACTION_GET_MAP_SECURITY_USERS_SUCCEEDED,
} from './action';
import {
  ACTION_NOTIFICATION_ERROR,
  ACTION_NOTIFICATION_SUCCESS,
} from '../notifications/action';

import { MESSAGES } from '../notifications/config';

import {
  GET_MAP_SECURITY_USERS_REQUESTED,
  UPDATE_MAP_SECURITY_USERS_REQUESTED,
  DELETE_MAP_SECURITY_USERS_REQUESTED,
} from './types';

function* getMapSecurityUsersSaga({ mapId }) {
  try {
    const mapSecurityUsers = yield call(getMapSecurityUsers, mapId);

    yield put(ACTION_GET_MAP_SECURITY_USERS_SUCCEEDED(mapSecurityUsers));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_GET_MAP_SECURITY_USERS_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* updateMapSecurityUsersSaga({ mapSecurityUsers, mapId }) {
  try {
    const { userId: UserId, acl: Acl } = mapSecurityUsers.users[0];

    yield call(updateMapSecurityUsers, mapId, { UserId, Acl });

    yield put(
      ACTION_NOTIFICATION_SUCCESS(MESSAGES.ON_UPDATE.MAP_SECURITY_USERS),
    );
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* deleteMapSecurityUsersSaga({ userId, mapId }) {
  try {
    yield call(deleteMapSecurityUsers, mapId, userId);

    yield put(
      ACTION_NOTIFICATION_SUCCESS(MESSAGES.ON_DELETE.MAP_SECURITY_USERS),
    );
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* mapSecurityUsersSaga() {
  yield takeLatest(GET_MAP_SECURITY_USERS_REQUESTED, getMapSecurityUsersSaga);
  yield takeLatest(
    UPDATE_MAP_SECURITY_USERS_REQUESTED,
    updateMapSecurityUsersSaga,
  );
  yield takeLatest(
    DELETE_MAP_SECURITY_USERS_REQUESTED,
    deleteMapSecurityUsersSaga,
  );
}

export default mapSecurityUsersSaga;
