import createInstance from '../createCustomInstance';
import {
  edgeDefaultsFromServer,
  nodeDefaultsFromServer,
} from '../../helpers/applyAPIMapping';

const API = createInstance();

export const getEdgeDefaults = () =>
  API.get('/templates/links')
    .then(({ data: { data: edgeDefault } }) =>
      edgeDefaultsFromServer(edgeDefault),
    )
    .catch((error) => {
      throw error;
    });

export const getNodeDefaults = () =>
  API.get('/templates/nodes')
    .then(({ data: { data: nodeDefault } }) =>
      nodeDefaultsFromServer(nodeDefault),
    )
    .catch((error) => {
      throw error;
    });
