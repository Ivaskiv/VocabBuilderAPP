//trimObjStrValues.jsx
export const trimObjStrValues = (obj, keys) => {
  const keysArray = keys || Object.keys(obj);

  return keysArray.reduce((trimmedObj, key) => {
    if (key in obj) {
      trimmedObj[key] = typeof obj[key] === 'string' ? obj[key].trim() : obj[key];
    }

    return trimmedObj;
  });
};
