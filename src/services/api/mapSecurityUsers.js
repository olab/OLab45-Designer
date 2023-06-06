import createInstance from '../createCustomInstance';

const API = createInstance();

export function getMapSecurityUsers(mapId) {
  return API.get(`/designer/maps/${mapId}/securityusers`)
    .then(({ data: { data = [] } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function updateMapSecurityUsers(mapId, data) {
  return API.post(`/designer/maps/${mapId}/securityusers`, data)
    .then(({ data: { data = [] } }) => data)
    .catch((error) => {
      throw error;
    });
}
