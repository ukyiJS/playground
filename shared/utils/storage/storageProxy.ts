import type { BaseStorage } from './types';
import { isString } from './utils';

export const storageProxy = (): ProxyHandler<BaseStorage> => ({
  get(target, p): unknown {
    if (isString(p) && p in target) return target[p];
    const item = target.getItem(p as string);
    return item !== null ? item : undefined;
  },
  set(target, p, newValue): boolean {
    target.setItem(p as string, newValue);
    return true;
  },
  defineProperty(target, p, attributes): boolean {
    target.setItem(p as string, attributes.value);
    return true;
  },
  deleteProperty(target, p): boolean {
    target.removeItem(p as string);
    return true;
  },
  getOwnPropertyDescriptor(target, p): PropertyDescriptor {
    if (p in target) return {};
    return {
      configurable: true,
      enumerable: true,
      value: target.getItem(p as string),
      writable: true,
    };
  },
  has(target, p): boolean {
    if (isString(p) && p in target) return true;
    return target.getItem(p as string) !== null;
  },
  ownKeys(target): string[] {
    return target.keys();
  },
  preventExtensions(_): boolean {
    throw new TypeError('can\'t prevent extensions on this proxy object');
  },
});