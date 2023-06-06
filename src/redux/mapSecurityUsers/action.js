// @flow
import {
  type MapSecurityUsers as MapSecurityUsersType,
  GET_MAP_SECURITY_USERS_REQUESTED,
  GET_MAP_SECURITY_USERS_SUCCEEDED,
  GET_MAP_SECURITY_USERS_FAILED,
  UPDATE_MAP_SECURITY_USERS_REQUESTED,
} from './types';

export const ACTION_GET_MAP_SECURITY_USERS_FAILED = () => ({
  type: GET_MAP_SECURITY_USERS_FAILED,
});

export const ACTION_GET_MAP_SECURITY_USERS_SUCCEEDED = (
  mapSecurityUsers: MapSecurityUsersType,
) => ({
  type: GET_MAP_SECURITY_USERS_SUCCEEDED,
  mapSecurityUsers,
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
