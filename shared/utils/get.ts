export const get = <T>(state: ObjectLiteral, path?: string | string[] | null, defaultValue: T | null = null): T | null => {
  if (!path) return null;
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray?.reduce((acc, key) => acc?.[key], state) as T;

  return result === undefined ? defaultValue : result;
};