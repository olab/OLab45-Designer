import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  getGroups,
  getMapGroups,
  updateMapGroups,
} from '../../services/api/mapGroups';

import {
  ACTION_GET_GROUPS_FAILED,
  ACTION_GET_GROUPS_SUCCEEDED,
} from './action';
import {
  ACTION_GET_MAP_GROUPS_FAILED,
  ACTION_GET_MAP_GROUPS_SUCCEEDED,
} from './action';
import {
  ACTION_NOTIFICATION_ERROR,
  ACTION_NOTIFICATION_SUCCESS,
} from '../notifications/action';

import { MESSAGES } from '../notifications/config';

import {
  GET_GROUPS_REQUESTED,
  GET_MAP_GROUPS_REQUESTED,
  UPDATE_MAP_GROUPS_REQUESTED,
} from './types';


function* getGroupsSaga() {
  try {
    const groups = yield call(getGroups, mapId);

    yield put(ACTION_GET_GROUPS_SUCCEEDED(groups, mapId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_GET_GROUPS_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* getMapGroupsSaga({ mapId }) {
  try {
    const mapGroups = yield call(getMapGroups, mapId);

    yield put(ACTION_GET_MAP_GROUPS_SUCCEEDED(mapGroups, mapId));
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_GET_MAP_GROUPS_FAILED());
    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* updateMapGroupsSaga({ MapGroups, mapId }) {
  try {
    const { userId: UserId, acl: Acl } = MapGroups.users[0];

    yield call(updateMapGroups, mapId, { UserId, Acl });

    yield put(
      ACTION_NOTIFICATION_SUCCESS(MESSAGES.ON_UPDATE.MAP_GROUPS),
    );
  } catch (error) {
    const { response, message } = error;
    const errorMessage = response ? response.statusText : message;

    yield put(ACTION_NOTIFICATION_ERROR(errorMessage));
  }
}

function* mapGroupsSaga() {
  yield takeLatest(GET_GROUPS_REQUESTED, getGroupsSaga);
  yield takeLatest(GET_MAP_GROUPS_REQUESTED, getMapGroupsSaga);
  yield takeLatest(UPDATE_MAP_GROUPS_REQUESTED, updateMapGroupsSaga);
}

export default mapGroupsSaga;
