import createInstance from '../createCustomInstance';

const API = createInstance();

export const updateNodeGrid = (mapId, nodes) =>
  API.put(`/designer/maps/${mapId}/nodes`, nodes).catch((error) => {
    throw error;
  });

export default {
  updateNodeGrid,
};
