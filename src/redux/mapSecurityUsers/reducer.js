// @flow
import {
  type MapSecurityUsersActions,
  type MapSecurityUsers as MapSecurityUsersType,
  GET_MAP_SECURITY_USERS_FAILED,
  GET_MAP_SECURITY_USERS_SUCCEEDED,
  GET_MAP_SECURITY_USERS_REQUESTED,
  UPDATE_MAP_SECURITY_USERS_REQUESTED,
  DELETE_MAP_SECURITY_USERS_REQUESTED,
} from './types';

export const initialMapSecurityUsersState = {
  users: [],
  isFetching: true,
};

const mapSecurityUsers = (
  state: MapSecurityUsersType = initialMapSecurityUsersState,
  action: MapSecurityUsersActions,
) => {
  switch (action.type) {
    case GET_MAP_SECURITY_USERS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case GET_MAP_SECURITY_USERS_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case GET_MAP_SECURITY_USERS_SUCCEEDED: {
      const { mapSecurityUsers, mapId } = action;
      return {
        ...state,
        users: mapSecurityUsers,
        mapId,
        isFetching: false,
      };
    }
    case UPDATE_MAP_SECURITY_USERS_REQUESTED: {
      const { mapSecurityUsers, mapId } = action;
      const user = mapSecurityUsers.users[0];
      return {
        ...state,
        users: state.users
          .map((u) => (user.userId == u.userId ? user : u))
          .concat(
            state.users.find((u) => u.userId == user.userId) ? [] : [user],
          ),
        isFetching: false,
      };
    }
    case DELETE_MAP_SECURITY_USERS_REQUESTED: {
      const { userId, mapId } = action;
      return {
        ...state,
        users: state.users.filter((u) => u.userId != userId),
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default mapSecurityUsers;
