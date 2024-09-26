import { config } from '../config';

const defaultConfig = {
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default defaultConfig;

export const NODE_EDITOR_AUTOSAVE_TIMEOUT = 100; // in milliseconds
