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
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function deleteMapSecurityUsers(mapId, userId) {
  return API.delete(`/designer/maps/${mapId}/securityusers/${userId}`)
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function searchSecurityUsersCandidates(mapId, query) {
  return API.get(
    `/designer/maps/${mapId}/securityusers/candidates?${new URLSearchParams({
      search: query,
    })}`,
  )
    .then(({ data: { data = [] } }) => data)
    .catch((error) => {
      throw error;
    });
}

export function insertSystemUser(mapId, user) {
  return API.put(`/designer/maps/${mapId}/securityusers/candidates`, user)
    .then(({ data: { data = false } }) => data)
    .catch((error) => {
      throw error;
    });
}
