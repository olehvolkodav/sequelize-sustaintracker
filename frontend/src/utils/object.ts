// Returns a nested property of an object at the given path.
export const resolvePath = (
  obj: Record<string, unknown>,
  path: string
): unknown => {
  let properties = path.replace(/\[(\w+)\]/g, '.$1');
  properties = properties.replace(/^\./, '');
  const a = properties.split('.');
  let o = obj as unknown;
  for (let i = 0, n = a.length; i < n; i += 1) {
    const k = a[i];
    if (o && typeof o === 'object' && k in o) {
      o = o[k as keyof typeof o];
    } else {
      return undefined;
    }
  }
  return o;
};

// Reduces an array of objects to an object, indexed by the property 'key' of
// the objects.
export const arrayToObjectBy = <T, K extends keyof T>(
  arr: T[],
  key: K
): Record<string, T> => {
  const result: Record<string, T> = {};
  arr.forEach((obj: T) => {
    result[String(obj[key])] = obj;
  });
  return result;
};

// Returns an array of objects sorted by the 'key' attribute.
// If the attribute is undefined the element placed last.
export const sortBy = <T, K extends keyof T>(arr: T[], key: K): T[] => {
  const result = arr;
  return result.sort((a, b) => {
    if ((a[key] === undefined) !== (b[key] === undefined)) {
      if (a[key] === undefined) return 1;
      if (b[key] === undefined) return -1;
    }
    if (String(a[key]).toLowerCase() < String(b[key]).toLowerCase()) return -1;
    if (String(a[key]).toLowerCase() > String(b[key]).toLowerCase()) return 1;
    return 0;
  });
};
