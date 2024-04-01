// @flow
import { isBoolean, isNumber } from './dataTypes';
import { QUESTION_TYPES } from '../components/SOEditor/config';

import type { QuestionResponse } from '../redux/questionResponses/types';
import type { MapItem } from '../redux/map/types';
import type { MapDetails } from '../redux/mapDetails/types';
import type { CounterActions } from '../redux/counterGrid/types';
import type { Edge } from '../components/Constructor/Graph/Edge/types';
import type { Node } from '../components/Constructor/Graph/Node/types';
import type { DefaultNode, DefaultEdge } from '../redux/defaults/types';
import type {
  ScopedObject,
  ScopedObjectListItem,
  ScopedObjectBase,
} from '../redux/scopedObjects/types';

export const edgeToServer = (edgeData: Edge): Edge => ({
  color: edgeData.color,
  destinationId: edgeData.target,
  followOnce: Number(edgeData.isFollowOnce),
  hidden: Number(edgeData.isHidden),
  id: edgeData.id,
  lineType: edgeData.variant,
  linkStyleId: edgeData.linkStyle,
  map_id: edgeData.map_id,
  sourceId: edgeData.source,
  text: edgeData.label,
  thickness: edgeData.thickness,
});

export const edgeFromServer = (edgeData: Edge): Edge => ({
  color: edgeData.color,
  id: edgeData.id,
  isFollowOnce: Boolean(edgeData.followOnce),
  isHidden: Boolean(edgeData.hidden),
  isSelected: false,
  label: edgeData.text || '',
  linkStyle: edgeData.linkStyleId,
  map_id: edgeData.map_id,
  source: edgeData.sourceId,
  target: edgeData.destinationId,
  thickness: edgeData.thickness,
  variant: edgeData.lineType,
});

export const edgeDefaultsFromServer = (
  edgeDefault: DefaultEdge,
): DefaultEdge => ({
  label: edgeDefault.text,
  color: edgeDefault.color,
  variant: edgeDefault.lineType,
  linkStyle: edgeDefault.linkStyleId,
  thickness: edgeDefault.thickness,
  isHidden: Boolean(edgeDefault.hidden),
  isFollowOnce: Boolean(edgeDefault.followOnce),
});

export const questionResponseToServer = (
  data: QuestionResponse,
): QuestionResponse => ({
  createdat: data.createdat || '2019-09-19T09:32:06',
  description: data.description,
  feedback: data.feedback,
  from: data.from,
  id: data.id == -1 ? null : data.id,
  isCorrect: data.isCorrect,
  name: data.name,
  order: data.order,
  questionId: data.questionId,
  response: data.response,
  score: data.score,
  to: data.to,
  updatedat: data.updatedat || null,
});

export const questionResponseFromServer = (
  data: QuestionResponse,
): QuestionResponse => ({
  created_at: data.created_at,
  description: data.description,
  feedback: data.feedback,
  from: data.from,
  id: data.id,
  isCorrect: data.isCorrect,
  name: data.name,
  order: data.order,
  questionId: data.questionId,
  response: data.response,
  score: data.score,
  to: data.to,
  updated_At: data.updated_At,
});

export const nodeToServer = (data: Node): Node => ({
  id: data.id,
  mapId: data.mapId,
  title: data.title,
  text: data.text,
  typeId: data.type,
  x: data.x,
  y: data.y,
  height: data.height,
  width: data.width,
  locked: Number(data.isLocked),
  collapsed: Number(data.isCollapsed),
  color: data.color,
  visitOnce: Number(data.isVisitOnce),
  isEnd: Number(data.isEnd),
  linkStyleId: data.linkStyle,
  priorityId: data.priorityId,
  linkTypeId: data.linkType,
  annotation: data.annotation,
  info: data.info,
});

export const nodeFromServer = (data: Node): Node => ({
  id: data.id,
  mapId: data.mapId,
  title: data.title,
  x: data.x,
  y: data.y,
  width: data.width || 0,
  height: data.height || 0,
  color: data.color,
  type: data.typeId,
  text: data.text,
  linkStyle: data.linkStyleId,
  priorityId: data.priorityId,
  linkType: data.linkTypeId,
  isCollapsed: Boolean(data.collapsed),
  isLocked: Boolean(data.locked),
  isVisitOnce: Boolean(data.visitOnce),
  isEnd: Boolean(data.isEnd),
  isSelected: true,
  isFocused: false,
  annotation: data.annotation,
  info: data.info,
});

export const nodeDefaultsFromServer = (
  nodeDefault: DefaultNode,
): DefaultNode => ({
  title: nodeDefault.title,
  text: nodeDefault.text,
  x: nodeDefault.x,
  y: nodeDefault.y,
  isLocked: Boolean(nodeDefault.locked),
  isCollapsed: Boolean(nodeDefault.collapsed),
  height: nodeDefault.height,
  width: nodeDefault.width,
  linkStyle: nodeDefault.linkStyleId,
  linkType: nodeDefault.linkTypeId,
  type: nodeDefault.typeId,
  color: nodeDefault.color,
});

export const mapDetailsFromServer = (mapData: MapDetails): MapDetails => ({
  abstract: mapData.abstract,
  author: mapData.author,
  description: mapData.description,
  devNotes: mapData.devNotes,
  feedback: mapData.feedback,
  guid: mapData.guid,
  id: mapData.id,
  isEnabled: Boolean(mapData.enabled),
  isInstructorGuideComplete: Boolean(mapData.instructorGuideComplete),
  isLinkLogicVerified: Boolean(mapData.linkLogicVerified),
  isMediaContentComplete: Boolean(mapData.mediaContentComplete),
  isMediaCopyrightVerified: Boolean(mapData.mediaCopyrightVerified),
  isNodeContentVerified: Boolean(mapData.nodeContentVerified),
  isSendXapiStatements: Boolean(mapData.sendXapiStatements),
  isTemplate: Boolean(mapData.isTemplate),
  keywords: mapData.keywords,
  name: mapData.name,
  notes: mapData.notes,
  reminderMsg: mapData.reminderMsg,
  securityId: mapData.securityId,
  securityType: mapData.securityType,
  sectionId: mapData.sectionId,
  source: mapData.source,
  themeId: mapData.themeId,
  typeId: mapData.typeId,
  themes: mapData.themes,
  units: mapData.units,
  reportNodeId: mapData.reportNodeId,
});

export const mapDetailsToServer = (mapData: MapDetails): MapDetails => ({
  abstract: mapData.abstract,
  author: mapData.author,
  description: mapData.description,
  devNotes: mapData.devNotes,
  enabled: Number(mapData.isEnabled),
  feedback: mapData.feedback,
  guid: mapData.guid,
  id: mapData.id,
  instructorGuideComplete: Number(mapData.isInstructorGuideComplete),
  isTemplate: Number(mapData.isTemplate),
  keywords: mapData.keywords,
  linkLogicVerified: Number(mapData.isLinkLogicVerified),
  mediaContentComplete: Number(mapData.isMediaContentComplete),
  mediaCopyrightVerified: Number(mapData.isMediaCopyrightVerified),
  name: mapData.name,
  nodeContentVerified: Number(mapData.isNodeContentVerified),
  notes: mapData.notes,
  reminderMsg: mapData.reminderMsg,
  securityType: mapData.securityType,
  securityId: mapData.securityId,
  sectionId: mapData.sectionId,
  sendXapiStatements: Number(mapData.isSendXapiStatements),
  source: mapData.source,
  themeId: mapData.themeId,
  typeId: mapData.typeId,
  units: mapData.units,
  reportNodeId: mapData.reportNodeId,
});

export const mapFromServer = (mapData: MapItem): MapItem => ({
  nodes: mapData.nodes ? mapData.nodes.map((node) => nodeFromServer(node)) : [],
  edges: mapData.edges ? mapData.edges.map((edge) => edgeFromServer(edge)) : [],
});

export const mapFromServerOnCreate = ({
  nodes,
  edges,
  mapDetails,
}: {
  nodes: Node,
  edges: Edge,
  mapDetails: MapDetails,
}) => ({
  ...mapDetailsFromServer(mapDetails),
  ...mapFromServer({ nodes, edges }),
});

export const mapFromServerOnExtend = ({ nodes, links }) => {
  const payload = {
    extendedNodes: nodes.map((node) => nodeFromServer(node)),
    extendedEdges: links.map((edge) => edgeFromServer(edge)),
  };

  return payload;
};

export const templateFromServer = mapFromServer;

export const scopedObjectByTypeFromServer = ({
  url,
  isPrivate,
  showAnswer,
  showSubmit,
  ...restSO
}: ScopedObjectListItem): ScopedObjectListItem => {
  const objectPayload = {
    ...restSO,
    ...(isBoolean(isPrivate) && { isPrivate: Number(isPrivate) }),
    ...(isNumber(showAnswer) && { showAnswer: Number(showAnswer) }),
    ...(isNumber(showSubmit) && { showSubmit: Number(showSubmit) }),
  };

  return objectPayload;
};

export const scopedObjectFromServer = ({
  url,
  ...restSO
}: ScopedObject | ScopedObjectListItem): ScopedObject => {
  const objectPayload = {
    ...restSO,
    details: null,
    isShowEyeIcon: Boolean(url),
    isDetailsFetching: false,
  };

  return objectPayload;
};

export const fileObjectToServer = (SO: ScopedObjectBase): ScopedObjectBase => {
  var form_data = new FormData();
  for (var key in SO) {
    form_data.append(key, SO[key]);
  }
  return form_data;
};

export const scopedObjectToServer = (
  SO: ScopedObjectBase,
): ScopedObjectBase => {
  if (Number(Object.keys(QUESTION_TYPES)[0]) === SO.questionType) {
    const {
      feedback,
      layoutType,
      isPrivate,
      showAnswer,
      showSubmit,
      ...restSO
    } = SO;

    const serverObject = {
      ...restSO,
      ...(!SO.placeholder && { placeholder: 'Default Placeholder Value' }),
    };
    return serverObject;
  }

  const {
    width,
    height,
    placeholder,
    isPrivate,
    showAnswer,
    showSubmit,
    ...restSO
  } = SO;

  const serverPayload = {
    ...restSO,
    ...(isBoolean(isPrivate) && { isPrivate: Number(isPrivate) }),
    ...(isBoolean(showAnswer) && { showAnswer: Number(showAnswer) }),
    ...(isBoolean(showSubmit) && { showSubmit: Number(showSubmit) }),
  };

  return serverPayload;
};

export const scopedObjectDetailsFromServer = ({
  id,
  name,
  parentId,
  url,
  ...restSODetails
}: ScopedObject): ScopedObject => ({
  id,
  name,
  ...(parentId && { parentId }),
  ...restSODetails,
  ...(url && { isShowEyeIcon: Boolean(url) }),
});

export const counterGridActionsFromServer = ({
  visible,
  ...restActions
}: CounterActions): CounterActions => ({
  ...restActions,
  isVisible: Boolean(visible),
});

export const counterGridActionsToServer = ({
  isVisible,
  ...restActions
}: CounterActions): CounterActions => ({
  ...restActions,
  visible: Number(isVisible),
});
