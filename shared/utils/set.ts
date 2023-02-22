export const set = <T>(state: ObjectLiteral, path: string | string[], value: unknown): T => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  pathArray?.reduce((acc, key, i) => {
    if (i === pathArray.length - 1) acc[key] = value;
    return acc[key] = acc[key] ?? {};
  }, state);
  return state as T;
};