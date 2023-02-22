/* eslint-disable @typescript-eslint/no-explicit-any */
interface BaseStorage extends Storage {
  getItem<T = string>(key: string): T | null;
  setItem(key: string, value: unknown): this;
  removeItem(key: string): this;
  pickItem<T = string>(key: string): T | null;
  clear(): this;
  valueOf<T extends Record<string, unknown> = Record<string, string>>(): T;
  key(index: number): string | null;
  keys(): string[];
  get length(): number;
}

interface StorageConstructor<Id extends string = string> {
  new(id: Id): BaseStorage;
  prototype: BaseStorage;
  isValid(): boolean;
}

const generateKey = () => Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join('');

const isString = (value: unknown): value is string => !!value && typeof value === 'string';

const isJsonString = (value: unknown): value is string => isString(value) ? value.indexOf('}') > value.indexOf('{') || value.indexOf(']') > value.indexOf('[') : false;

const parseJson = <T>(value: unknown): T | null => isJsonString(value) ? JSON.parse(value) : value;

const storageProxyHandler = (): ProxyHandler<BaseStorage> => ({
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

const storage = <Id extends string, S extends Storage>(storage: S): StorageConstructor<Id> => class implements BaseStorage {
  constructor(protected readonly _id: Id) {
  }

  static isValid(): boolean {
    const KEY = generateKey();
    try {
      storage.setItem(KEY, 'test');
      storage.removeItem(KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  getItem<T>(key: string): T | null {
    const item = storage.getItem(`${this._id}#${key}`);
    return parseJson<T>(item);
  }

  setItem(key: string, value: unknown): this {
    const item = isString(value) ? value : JSON.stringify(value);
    storage.setItem(`${this._id}#${key}`, item);
    return this;
  }

  removeItem(key: string): this {
    storage.removeItem(`${this._id}#${key}`);
    return this;
  }

  pickItem<T>(key: string): T | null {
    const item = this.getItem<T>(key);
    this.removeItem(key);
    return item;
  }

  clear(): this {
    storage.clear();
    return this;
  }

  get length() {
    return storage.length;
  }

  key(index: number): string | null {
    return storage.key(index);
  }

  keys<T extends string[]>(): T {
    return Object.keys(this.valueOf()) as T;
  }

  valueOf<T extends ObjectLiteral>(): T {
    const storages = storage.valueOf() as T;
    return Object.entries(storages).reduce((acc, [key, value]) => {
      const _key = key as string;
      const regExp = RegExp(`^${this._id}#`);

      if (!regExp.test(_key)) return acc;
      return { ...acc, [_key.replace(regExp, '')]: parseJson(value) };
    }, {} as T);
  }
};

export class MemoStorage<Id extends string> implements BaseStorage {
  readonly #id: Id;
  readonly #storage = new Map<string, string>();

  constructor(id: Id) {
    this.#id = id;
    return new Proxy<MemoStorage<Id>>(this, storageProxyHandler());
  }

  getItem<T>(key: string): T | null {
    const item = this.#storage.get(`${this.#id}#${key}`);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: unknown): this {
    this.#storage.set(`${this.#id}#${key}`, JSON.stringify(value));
    return this;
  }

  removeItem(key: string): this {
    this.#storage.delete(`${this.#id}#${key}`);
    return this;
  }

  pickItem<T>(key: string): T | null {
    this.#storage.values();
    const item = this.getItem<T>(`${this.#id}#${key}`);
    this.removeItem(key);

    return item;
  }

  clear(): this {
    this.#storage.clear();
    return this;
  }

  valueOf<T extends ObjectLiteral>(): T {
    const entries = [...this.#storage.entries()] as Iterable<any>;
    return Object.fromEntries(entries) as T;
  }

  key(index: number): string {
    return [...this.#storage.values()][index];
  }

  keys(): string[] {
    return [...this.#storage.keys()];
  }

  get length(): number {
    return this.#storage.size;
  }
}

export class LocalStorage<Id extends string> extends storage(localStorage) {
  constructor(id: Id) {
    super(id);
    return new Proxy<LocalStorage<Id>>(this, storageProxyHandler());
  }
}

export class SessionStorage<Id extends string> extends storage(sessionStorage) {
  constructor(id: Id) {
    super(id);
    return new Proxy<SessionStorage<Id>>(this, storageProxyHandler());
  }
}

export function generateStorage<Id extends string>(id: Id, storage: StorageConstructor<Id> | 'sessionStorage' | 'localStorage'): BaseStorage {
  const Storage = isString(storage)
    ? storage === 'localStorage'
      ? LocalStorage<Id>
      : SessionStorage<Id>
    : storage;
  return Storage.isValid() ? new Storage(id) : new MemoStorage<Id>(id);
}

export const getMemoStorage = (() => {
  const storageMap = new Map<string, BaseStorage>();
  return <Id extends string>(id: Id) => storageMap.get(id) ?? storageMap.set(id, new MemoStorage(id)).get(id) as MemoStorage<Id>;
})();

export const getLocalStorage = (() => {
  const storageMap = new Map<string, BaseStorage>();
  return <Id extends string>(id: Id) => (storageMap.get(id) ?? storageMap.set(id, generateStorage(id, LocalStorage)).get(id)) as LocalStorage<Id>;
})();

export const getSessionStorage = (() => {
  const storageMap = new Map<string, BaseStorage>();
  return <Id extends string>(id: Id) => (storageMap.get(id) ?? storageMap.set(id, generateStorage(id, SessionStorage)).get(id)) as SessionStorage<Id>;
})();
