// @flow
export type MapGroup = {
  id: String,
  name: String
};

export type MapGroups = {
  mapGroups: Array<MapGroup>,
};

export type Groups = {
  groups: Array<MapGroup>,
};

const GET_GROUPS_SUCCEEDED = 'GET_GROUPS_SUCCEEDED';
type GetGroupsSucceeded = {
  type: 'GET_GROUPS_SUCCEEDED',
  groups: Groups,
};

const GET_GROUPS_FAILED = 'GET_GROUPS_FAILED';
type GetGroupsFailed = {
  type: 'GET_GROUPS_FAILED',
};

const GET_GROUPS_REQUESTED = 'GET_GROUPS_REQUESTED';
type GetGroupsRequested = {
  type: 'GET_GROUPS_REQUESTED',
  mapId: string,
};


const GET_MAP_GROUPS_SUCCEEDED = 'GET_MAP_GROUPS_SUCCEEDED';
type GetMapGroupsSucceeded = {
  type: 'GET_MAP_GROUPS_SUCCEEDED',
  mapGroups: MapGroups,
};

const GET_MAP_GROUPS_FAILED = 'GET_MAP_GROUPS_FAILED';
type GetMapGroupsFailed = {
  type: 'GET_MAP_GROUPS_FAILED',
};

const GET_MAP_GROUPS_REQUESTED = 'GET_MAP_GROUPS_REQUESTED';
type GetMapGroupsRequested = {
  type: 'GET_MAP_GROUPS_REQUESTED',
  mapId: string,
};

const UPDATE_MAP_GROUPS_REQUESTED = 'UPDATE_MAP_GROUPS_REQUESTED';
type UpdateMapGroupsRequested = {
  type: 'UPDATE_MAP_GROUPS_REQUESTED',
  MapGroups: MapGroups,
};

export type MapGroupsActions =
  | GetGroupsSucceeded
  | GetGroupsFailed
  | GetGroupsRequested
  | GetMapGroupsSucceeded
  | GetMapGroupsFailed
  | GetMapGroupsRequested
  | UpdateMapGroupsRequested;

export {
  GET_GROUPS_FAILED,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_REQUESTED,
  GET_MAP_GROUPS_FAILED,
  GET_MAP_GROUPS_SUCCEEDED,
  GET_MAP_GROUPS_REQUESTED,
  UPDATE_MAP_GROUPS_REQUESTED,
};
