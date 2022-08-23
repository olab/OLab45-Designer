import createInstance from '../createCustomInstance';
import { nodeToServer, nodeFromServer } from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getNode = (mapId, nodeId) => API
  .get(`/designer/maps/${mapId}/node/${nodeId}`)
  .then(({ data: { data: node } }) => nodeFromServer(node))
  .catch((error) => {
    throw error;
  });

export const getNodesRaw = mapId => API
  .get(`/designer/maps/${mapId}/nodes`)
  .then(({ data: { data } }) => ({
    nodes: data.map(node => nodeFromServer(node)),
  }))
  .catch((error) => {
    throw error;
  });

export const getNodes = mapId => API
  .get(`/maps/${mapId}/nodes`)
  .then(({ data: { data } }) => ({
    nodes: data.map(node => nodeFromServer(node)),
  }))
  .catch((error) => {
    throw error;
  });

export const createNode = (mapId, position, sourceNodeId) => API
  .post(`/designer/maps/${mapId}/nodes`, {
    ...position,
    ...(sourceNodeId && { sourceId: sourceNodeId }),
  })
  .then(({ data: { data } }) => {
    const { id: newNodeId, links } = data;

    if (links) {
      const { id: newEdgeId } = links;

      return {
        newNodeId,
        newEdgeId,
      };
    }

    return newNodeId;
  })
  .catch((error) => {
    throw error;
  });

export const updateNode = (mapId, updatedNode) => API
  .put(`/maps/${mapId}/nodes/${updatedNode.id}`, nodeToServer(updatedNode))
  .catch((error) => {
    throw error;
  });

export const deleteNode = (mapId, nodeId) => API
  .delete(`/maps/${mapId}/nodes/${nodeId}`)
  .catch((error) => {
    throw error;
  });
