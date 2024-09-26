// @flow
const removeHTMLTags = (text: string): string => {
  const regex = /(<([^>]+)>)/gi;
  const result = text.replace(regex, '');

  return result;
};

export default removeHTMLTags;
