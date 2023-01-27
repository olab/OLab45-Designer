// @flow
const filterByParent = (items: Array<any>, queryStr: string): Array<any> => {
  const queryStrClear = queryStr.trim().toLowerCase();
  let itemsFiltered = [];
  
  if ( queryStr && ( queryStr.length == 0 ) ) {
    return itemsFiltered;
  }
  
  for (const item of items) {
    if ( item.scopeLevelObj && item.scopeLevelObj.name ) {
      if ( item.scopeLevelObj.name.toLowerCase().includes(queryStrClear) ){
        itemsFiltered.push( item );
      }
    }
  }

  return itemsFiltered;
};

export default filterByParent;
