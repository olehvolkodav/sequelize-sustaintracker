// maps an object to an array of key/value pairs, appended to 'result'
// (the key is the prefix + path of the attribute in the object);
const mapToKeyValuePairs = (object, prefix, result) => {
  const keys = Object.keys(object);
  keys.forEach((key) => {
    const value = object[key];
    if (typeof value !== 'object') {
      result.push({
        key: prefix + '.' + key,
        value: value,
      });
    } else mapToKeyValuePairs(value, prefix + '.' + key, result);
  });
};

module.exports = { mapToKeyValuePairs };
