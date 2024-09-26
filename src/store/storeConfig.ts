import { config } from '../config';

const defaultConfig = {
  /**
   * Returns base name(href) string using for for constructing route's paths
   *
   * @returns {string | undefined | string}
   */
  baseHref: config.APP_BASEPATH || '/',
};

export default defaultConfig;
