// @flow
import {
  type DefaultsActions,
  type Defaults as DefaultsType,
  SET_DEFAULTS,
} from './types';
import {
  USER_AUTH_LOGOUT,
} from '../login/types';

export const initialDefaultsState: DefaultsType = {
  edgeBody: {
    label: '',
    color: '',
    variant: null,
    thickness: null,
    linkStyle: null,
    isHidden: null,
    isFollowOnce: null,
  },
  nodeBody: {
    title: '',
    text: '',
    x: null,
    y: null,
    isLocked: null,
    isCollapsed: null,
    height: null,
    width: null,
    linkStyle: null,
    linkType: null,
    type: null,
    color: '',
  },
  groups: [],
  roles: []
};

const defaults = (
  state: DefaultsType = initialDefaultsState,
  action: DefaultsActions,
) => {
  switch (action.type) {
    case USER_AUTH_LOGOUT: {
      return initialDefaultsState;
    }
    case SET_DEFAULTS: {
      const { edgeBody, nodeBody, groups, roles } = action;

      return {
        edgeBody: {
          ...state.edgeBody,
          ...edgeBody,
        },
        nodeBody: {
          ...state.nodeBody,
          ...nodeBody,
        },
        groups: [...state.groups, ...groups],
        roles: [...state.roles, ...roles]
      };
    }
    default:
      return state;
  }
};

export default defaults;
