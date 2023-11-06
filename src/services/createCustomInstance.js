import axios from 'axios';
import merge from 'lodash.merge';
import defaultConfig from './apiConfig';
import addInterceptors from './createInterceptors';

const createInstance = (customConfig = {}) => {
  const newConfig = merge(customConfig, defaultConfig);
  const instance = axios.create(newConfig);

  console.log(`Axios default: ${JSON.stringify(newConfig)} `);

  return addInterceptors(instance);
};

export default createInstance;
