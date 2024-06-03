// @flow
import {
  type MapGroupsActions,
  type MapGroups as MapGroupsType,
  type Groups as GroupsType,
  GET_GROUPS_FAILED,
  GET_GROUPS_SUCCEEDED,
  GET_GROUPS_REQUESTED,
  GET_MAP_GROUPS_FAILED,
  GET_MAP_GROUPS_SUCCEEDED,
  GET_MAP_GROUPS_REQUESTED,
  UPDATE_MAP_GROUPS_REQUESTED,
} from './types';

export const initialState = {
  groups: [],
  mapGroups: [],
  isFetching: true,
};

const mapGroups = (
  state: MapGroupsType = initialState,
  action: MapGroupsActions,
) => {
  switch (action.type) {
    case GET_GROUPS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case GET_GROUPS_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case GET_GROUPS_SUCCEEDED: {
      const { groups, mapId } = action;
      return {
        ...state,
        groups: groups,
        mapId,
        isFetching: false,
      };
    }
    case GET_MAP_GROUPS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MAP_GROUPS_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case GET_MAP_GROUPS_SUCCEEDED: {
      const { mapGroups, mapId } = action;
      return {
        ...state,
        mapGroups: mapGroups,
        mapId,
        isFetching: false,
      };
    }
    case UPDATE_MAP_GROUPS_REQUESTED: {
      const { mapGroups, mapId } = action;
      const user = mapSecurityUsers.users[0];
      return {
        ...state,
        mapGroups: state.mapGroups,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default mapGroups;
