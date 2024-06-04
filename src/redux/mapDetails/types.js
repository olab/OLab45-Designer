// @flow
export type Themes = {
  id: number,
  name: string,
  description: string,
};

export type MapGroup = {
  id: String,
  name: String
};

export type Groups = {
  groups: Array<MapGroup>,
};

export type MapDetails = {
  id: number,
  themeId: number,
  securityType: number,
  name: string,
  notes: string,
  author: string,
  keywords: string,
  description: string,
  isEnabled: boolean,
  isFetching: boolean,
  isTemplate: boolean,
  isLinkLogicVerified: boolean,
  isSendXapiStatements: boolean,
  isNodeContentVerified: boolean,
  isMediaContentComplete: boolean,
  isMediaCopyrightVerified: boolean,
  isInstructorGuideComplete: boolean,
  themes: Array<Themes>,
};

//******/

const GET_MAP_DETAILS_SUCCEEDED = 'GET_MAP_DETAILS_SUCCEEDED';
type GetMapDetailsSucceeded = {
  type: 'GET_MAP_DETAILS_SUCCEEDED',
  mapDetails: MapDetails,
};

const GET_MAP_DETAILS_FAILED = 'GET_MAP_DETAILS_FAILED';
type GetMapDetailsFailed = {
  type: 'GET_MAP_DETAILS_FAILED',
};

const GET_MAP_DETAILS_REQUESTED = 'GET_MAP_DETAILS_REQUESTED';
type GetMapDetailsRequested = {
  type: 'GET_MAP_DETAILS_REQUESTED',
  mapId: string,
};

//******/

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
  type: 'GET_GROUPS_REQUESTED'
};

//******/

const UPDATE_MAP_DETAILS_REQUESTED = 'UPDATE_MAP_DETAILS_REQUESTED';
type UpdateMapDetailsRequested = {
  type: 'UPDATE_MAP_DETAILS_REQUESTED',
  mapDetails: MapDetails,
};

export type MapDetailsActions =
  | GetMapDetailsSucceeded
  | GetMapDetailsFailed
  | GetMapDetailsRequested
  | GetGroupsSucceeded
  | GetGroupsFailed
  | GetGroupsRequested
  | UpdateMapDetailsRequested;

export {
  GET_MAP_DETAILS_FAILED,
  GET_MAP_DETAILS_SUCCEEDED,
  GET_MAP_DETAILS_REQUESTED,
  GET_GROUPS_FAILED,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_REQUESTED,
  UPDATE_MAP_DETAILS_REQUESTED,
};
