// @flow
import { isPositiveInteger } from './dataTypes';

const filterByIndex = (items: Array<any>, queryStr: string): Array<any> => {
  let itemsFiltered = [];

  // test if invalid number to search for
  if (isNaN(queryStr)) {
    return itemsFiltered;
  }

  // test if positive number (valid index)
  if (isPositiveInteger(queryStr)) {
    itemsFiltered = items.filter(({ id }) => Number(id) === Number(queryStr));
  }
  return itemsFiltered;
};

export default filterByIndex;
