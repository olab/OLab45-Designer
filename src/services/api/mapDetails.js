import createInstance from '../createCustomInstance';
import { mapDetailsToServer, mapDetailsFromServer } from '../../helpers/applyAPIMapping';

const API = createInstance();

export function getMapDetails(mapId) {
  return API.get(`/maps/${mapId}`)
    .then(({ data: { data: mapData } }) => mapDetailsFromServer(mapData))
    .catch((error) => {
      throw error;
    });
}

export function updateMapDetails(mapDetails) {
  return API.put(`/maps/${mapDetails.id}`, { ...mapDetailsToServer(mapDetails) })
    .catch((error) => {
      throw error;
    });
}
