const defaultConfig = {
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default defaultConfig;

export const NODE_EDITOR_AUTOSAVE_TIMEOUT = 3 * 1000;

