import createInstance from '../createCustomInstance';

const API = createInstance();

export function getMapSecurityUsers(mapId) {
  return API.get(`/designer/maps/${mapId}/securityusers`)
    .then(({ data: { data = [] } }) => data)
    .catch((error) => {
      throw error;
    });
}
