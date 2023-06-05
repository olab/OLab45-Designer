// @flow
import {
  type MapSecurityUsersActions,
  type MapSecurityUsers as MapSecurityUsersType,
  GET_MAP_SECURITY_USERS_FAILED,
  GET_MAP_SECURITY_USERS_SUCCEEDED,
  GET_MAP_SECURITY_USERS_REQUESTED,
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
      const { mapSecurityUsers } = action;
      return {
        ...state,
        users: mapSecurityUsers,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default mapSecurityUsers;
