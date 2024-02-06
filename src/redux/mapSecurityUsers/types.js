// @flow
export type OlabUserObject = {
  id: String,
  email: String,
  username: String,
  nickname: String,
};

export type MapSecurityUser = {
  userId: number,
  acl: string,
  user?: OlabUserObject,
};

export type MapSecurityUsers = {
  users: Array<MapSecurityUser>,
};

const GET_MAP_SECURITY_USERS_SUCCEEDED = 'GET_MAP_SECURITY_USERS_SUCCEEDED';
type GetMapSecurityUsersSucceeded = {
  type: 'GET_MAP_SECURITY_USERS_SUCCEEDED',
  mapSecurityUsers: MapSecurityUsers,
};

const GET_MAP_SECURITY_USERS_FAILED = 'GET_MAP_SECURITY_USERS_FAILED';
type GetMapSecurityUsersFailed = {
  type: 'GET_MAP_SECURITY_USERS_FAILED',
};

const GET_MAP_SECURITY_USERS_REQUESTED = 'GET_MAP_SECURITY_USERS_REQUESTED';
type GetMapSecurityUsersRequested = {
  type: 'GET_MAP_SECURITY_USERS_REQUESTED',
  mapId: string,
};

const UPDATE_MAP_SECURITY_USERS_REQUESTED =
  'UPDATE_MAP_SECURITY_USERS_REQUESTED';
type UpdateMapSecurityUsersRequested = {
  type: 'UPDATE_MAP_SECURITY_USERS_REQUESTED',
  mapSecurityUsers: MapSecurityUsers,
};

const DELETE_MAP_SECURITY_USERS_REQUESTED =
  'DELETE_MAP_SECURITY_USERS_REQUESTED';
type DeleteMapSecurityUsersRequested = {
  type: 'DELETE_MAP_SECURITY_USERS_REQUESTED',
  userId: number,
  mapId: number,
};

export type MapSecurityUsersActions =
  | GetMapSecurityUsersSucceeded
  | GetMapSecurityUsersFailed
  | GetMapSecurityUsersRequested
  | UpdateMapSecurityUsersRequested
  | DeleteMapSecurityUsersRequested;

export {
  GET_MAP_SECURITY_USERS_FAILED,
  GET_MAP_SECURITY_USERS_SUCCEEDED,
  GET_MAP_SECURITY_USERS_REQUESTED,
  UPDATE_MAP_SECURITY_USERS_REQUESTED,
  DELETE_MAP_SECURITY_USERS_REQUESTED,
};
