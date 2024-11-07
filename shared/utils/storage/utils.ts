export const generateKey = (): string => Array.from({
  length: 4,
}, () => Math.random().toString(36)
  .slice(2)).join('');

export const isString = (value: unknown): value is string => !!value && typeof value === 'string';

export const isJsonString = (value: unknown): value is string => isString(value) ? value.indexOf('}') > value.indexOf('{') || value.indexOf(']') > value.indexOf('[') : false;
