// @flow
import type { Node } from '../Constructor/Graph/Node/types';
import {
  IdName
} from '../../redux/defaults/types';

export type AdvancedNodeEditorProps = {
  classes: {
    [prop: string]: any,
  },
  node: Node,
  match: any,
  history: any,
  mapId: number,
  nodeId: number,
  isDeleting: boolean,
  ACTION_UPDATE_NODE: Function,
  ACTION_GET_NODE_REQUESTED: Function,
  ACTION_GET_ROLES_REQUESTED: Function,
  ACTION_GET_GROUPS_REQUESTED: Function,
  ACTION_DELETE_NODE_MIDDLEWARE: Function,
  groups: Array<IdName>,
  roles: Array<IdName>,
};
