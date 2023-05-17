import createInstance from '../createCustomInstance';
import {
  mapFromServer,
  mapFromServerOnExtend,
  edgeFromServer,
  mapFromServerOnCreate,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getMap = (mapId) =>
  API.get(`/maps/${mapId}/nodes`)
    .then(({ data: { data: map } }) => mapFromServer(map))
    .catch((error) => {
      throw error;
    });

export function getMapLinks(mapId) {
  return API.get(`/maps/${mapId}/links`)
    .then(({ data: { data } }) => ({
      edges: data.map((link) => edgeFromServer(link)),
    }))
    .catch((error) => {
      throw error;
    });
}

export const createMap = (templateId) =>
  API.post('/maps', { ...(templateId && { templateId }) })
    .then((response) => mapFromServerOnCreate(response.data.data))
    .catch((error) => {
      if (!error.response || error.response.status !== 401) {
        throw error;
      }
    });

export const extendMap = (mapId, templateId) =>
  API.post(`/maps/${mapId}`, { templateId })
    .then((response) => mapFromServerOnExtend(response.data.data))
    .catch((error) => {
      throw error;
    });

// export const extendMap = (mapId, templateId) => API
//   .post(`/maps/${mapId}`, { templateId })
//   .then(({ data: { nodes, links } }) => ({
//     extendedNodes: nodes.map(node => nodeFromServer(node)),
//     extendedEdges: links.map(edge => edgeFromServer(edge)),
//   }))
//   .catch((error) => {
//     throw error;
//   });
