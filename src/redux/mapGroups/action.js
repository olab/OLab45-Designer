// @flow
import {
  type MapGroups as MapGroupsType,
  type Groups as GroupsType,
  GET_GROUPS_REQUESTED,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_FAILED,
  GET_MAP_GROUPS_REQUESTED,
  GET_MAP_GROUPS_SUCCEEDED,
  GET_MAP_GROUPS_FAILED,
  UPDATE_MAP_GROUPS_REQUESTED,
} from './types';

export const ACTION_GET_GROUPS_FAILED = () => ({
  type: GET_GROUPS_FAILED,
});

export const ACTION_GET_GROUPS_SUCCEEDED = (
  mapGroups: MapGroupsType,
  mapId: Number,
) => ({
  type: GET_GROUPS_SUCCEEDED,
  mapGroups,
  mapId,
});

export const ACTION_GET_GROUPS_REQUESTED = (mapId: string) => ({
  type: GET_GROUPS_REQUESTED,
  mapId,
});


export const ACTION_GET_MAP_GROUPS_FAILED = () => ({
  type: GET_MAP_GROUPS_FAILED,
});

export const ACTION_GET_MAP_GROUPS_SUCCEEDED = (
  mapGroups: MapGroupsType,
  mapId: Number,
) => ({
  type: GET_MAP_GROUPS_SUCCEEDED,
  mapGroups,
  mapId,
});

export const ACTION_GET_MAP_GROUPS_REQUESTED = (mapId: string) => ({
  type: GET_MAP_GROUPS_REQUESTED,
  mapId,
});


export const ACTION_UPDATE_MAP_GROUPS_REQUESTED = (
  mapId: Number,
  mapGroups: MapGroupsType,
) => ({
  type: UPDATE_MAP_GROUPS_REQUESTED,
  mapGroups,
  mapId,
});

