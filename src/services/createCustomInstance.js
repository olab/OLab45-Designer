import axios from 'axios';
import merge from 'lodash.merge';
import defaultConfig from './apiConfig';
import addInterceptors from './createInterceptors';

const createInstance = (customConfig = {}) => {
  alert(JSON.stringify(process.env));
  const newConfig = merge(customConfig, defaultConfig);
  const instance = axios.create(newConfig);

  return addInterceptors(instance);
};

export default createInstance;
