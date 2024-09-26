// @flow
import {
  type ScopeLevelsActions,
  type ScopeLevels as ScopeLevelsType,
  SCOPE_LEVELS_REQUESTED,
  SCOPE_LEVELS_REQUEST_FAILED,
  SCOPE_LEVELS_REQUEST_SUCCEEDED,
  SCOPE_LEVELS_CLEAR,
} from './types';
import {
  USER_AUTH_LOGOUT,
} from '../login/types';

export const initialScopeLevelsState: ScopeLevelsType = {
  globals: [],
  servers: [],
  courses: [],
  maps: [],
  isFetching: false,
};

const scopeLevels = (
  state: ScopeLevelsType = initialScopeLevelsState,
  action: ScopeLevelsActions,
) => {
  switch (action.type) {
    case USER_AUTH_LOGOUT: {
      return initialScopeLevelsState;
    }
    case SCOPE_LEVELS_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };
    case SCOPE_LEVELS_REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    case SCOPE_LEVELS_REQUEST_SUCCEEDED: {
      const { level, levelList } = action;

      return {
        ...state,
        [level]: [...levelList],
        isFetching: false,
      };
    }
    case SCOPE_LEVELS_CLEAR:
      return {
        ...initialScopeLevelsState,
      };
    default:
      return state;
  }
};

export default scopeLevels;
