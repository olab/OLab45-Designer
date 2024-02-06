// @flow
import {
  type MapSecurityUsers as MapSecurityUsersType,
  GET_MAP_SECURITY_USERS_REQUESTED,
  GET_MAP_SECURITY_USERS_SUCCEEDED,
  GET_MAP_SECURITY_USERS_FAILED,
  UPDATE_MAP_SECURITY_USERS_REQUESTED,
  DELETE_MAP_SECURITY_USERS_REQUESTED,
} from './types';

export const ACTION_GET_MAP_SECURITY_USERS_FAILED = () => ({
  type: GET_MAP_SECURITY_USERS_FAILED,
});

export const ACTION_GET_MAP_SECURITY_USERS_SUCCEEDED = (
  mapSecurityUsers: MapSecurityUsersType,
  mapId: Number,
) => ({
  type: GET_MAP_SECURITY_USERS_SUCCEEDED,
  mapSecurityUsers,
  mapId,
});

export const ACTION_GET_MAP_SECURITY_USERS_REQUESTED = (mapId: string) => ({
  type: GET_MAP_SECURITY_USERS_REQUESTED,
  mapId,
});

export const ACTION_UPDATE_MAP_SECURITY_USERS_REQUESTED = (
  mapId: Number,
  mapSecurityUsers: MapSecurityUsersType,
) => ({
  type: UPDATE_MAP_SECURITY_USERS_REQUESTED,
  mapSecurityUsers,
  mapId,
});

export const ACTION_DELETE_MAP_SECURITY_USERS_REQUESTED = (
  mapId: Number,
  userId: Number,
) => ({
  type: DELETE_MAP_SECURITY_USERS_REQUESTED,
  userId,
  mapId,
});
