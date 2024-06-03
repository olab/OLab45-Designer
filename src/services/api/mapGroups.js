import createInstance from '../createCustomInstance';

const API = createInstance();

export function updateMapGroups(mapId, data) {
  return API.put(`/designer/maps/${mapId}/groups`, data)
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function getMapGroups(mapId) {
  return API.get(`/designer/maps/${mapId}/groups`)
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function getGroups() {
  return API.get(`/groups`)
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}
