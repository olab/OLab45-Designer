// @flow
import {
  type DefaultEdge as DefaultEdgeType,
  type DefaultNode as DefaultNodeType,
  type Groups as GroupsType,
  type Roles as RolesType,
  SET_DEFAULTS,
} from './types';

export const ACTION_SET_DEFAULTS = (
  edgeBody: DefaultEdgeType,
  nodeBody: DefaultNodeType,
  groups: GroupsType,
  roles: RolesType
) => ({
  type: SET_DEFAULTS,
  edgeBody,
  nodeBody,
  groups,
  roles
});

export default {
  ACTION_SET_DEFAULTS,
};
