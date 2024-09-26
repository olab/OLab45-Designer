import createInstance from '../createCustomInstance';

const API = createInstance();

export function getScopeLevels(level) {
  return API.get(`/${level}`)
    .then(({ data: { data: scopeLevels } }) => scopeLevels)
    .catch((error) => {
      throw error;
    });
}

export default {
  getScopeLevels,
};
