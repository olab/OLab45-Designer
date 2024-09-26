// @flow
import type { FilterObject as FilterObjectType } from './types';

const getFilterCallback =
  (level: string, queryStr: string) =>
  ({ name, scopeLevel }: FilterObjectType): boolean => {
    try {
      const isLevelMatches = level === 'All' || scopeLevel === level;

      if (!isLevelMatches) {
        return false;
      }

      const nameLowerCased = name.toLowerCase();
      const queryStrLowerCased = queryStr.trim().toLowerCase();

      return nameLowerCased.includes(queryStrLowerCased);
    } catch (error) {
      return false;
    }
  };
export default getFilterCallback;
