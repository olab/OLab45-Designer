import createInstance from '../createCustomInstance';
import { edgeToServer } from '../../helpers/applyAPIMapping';

const API = createInstance();

const createEdgeBody = (id) => ({ destinationId: id });

export function createEdge(mapId, edgeData) {
  return API.post(
    `/designer/maps/${mapId}/nodes/${edgeData.source}/links`,
    createEdgeBody(edgeData.target),
  )
    .then(
      ({
        data: {
          data: { id },
        },
      }) => id,
    )
    .catch((error) => {
      throw error;
    });
}

export const deleteEdge = (mapId, edgeId, nodeId) =>
  API.delete(`/designer/maps/${mapId}/links/${edgeId}`).catch((error) => {
    throw error;
  });

export const updateEdge = (mapId, updatedEdgeData) =>
  API.put(
    `/maps/${mapId}/nodes/${updatedEdgeData.source}/links/${updatedEdgeData.id}`,
    { ...edgeToServer(updatedEdgeData) },
  ).catch((error) => {
    throw error;
  });

export const getEdge = (mapId, nodeId, edgeId) =>
  API.get(`/maps/${mapId}/nodes/${nodeId}/links/${edgeId}`)
    .then(({ data }) => data)
    .catch((error) => {
      throw error;
    });
