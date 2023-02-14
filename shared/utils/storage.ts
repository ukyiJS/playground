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

class MemoStorage implements BaseStorage {
  #storage = new Map<string, string>();

  constructor(protected id: string) {
  }

  getItem<T>(key: string): T | null {
    const item = this.#storage.get(`${this.id}#${key}`);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: unknown): this {
    this.#storage.set(`${this.id}#${key}`, JSON.stringify(value));
    return this;
  }

  removeItem(key: string): this {
    this.#storage.delete(`${this.id}#${key}`);
    return this;
  }

  pickItem<T>(key: string): T | null {
    this.#storage.values();
    const item = this.getItem<T>(`${this.id}#${key}`);
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

const generateKey = () => Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join('');

const storage = <Id extends string, S extends Storage>(storage: S): StorageConstructor<Id> => class implements BaseStorage {
  protected storage = storage;

  constructor(protected id: Id) {
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
    const item = this.storage.getItem(`${this.id}#${key}`);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: unknown): this {
    this.storage.setItem(`${this.id}#${key}`, JSON.stringify(value));
    return this;
  }

  removeItem(key: string): this {
    this.storage.removeItem(`${this.id}#${key}`);
    return this;
  }

  pickItem<T>(key: string): T | null {
    const item = this.getItem<T>(key);
    this.removeItem(key);
    return item;
  }

  clear(): this {
    this.storage.clear();
    return this;
  }

  get length() {
    return this.storage.length;
  }

  key(index: number): string | null {
    return this.storage.key(index);
  }

  keys<T extends string[]>(): T {
    return Object.keys(this.valueOf()) as T;
  }

  valueOf<T extends ObjectLiteral>(): T {
    const storage = this.storage.valueOf() as T;
    return Object.entries(storage).reduce((acc, [key, value]) => {
      const _key = key as string;
      const regExp = RegExp(`^${this.id}#`);

      if (!regExp.test(_key)) return acc;
      return { ...acc, [_key.replace(regExp, '')]: JSON.parse(value) };
    }, {} as T);
  }
};

class LocalStorage extends storage(localStorage) {
}

class SessionStorage extends storage(sessionStorage) {
}

export function generateStorage<Id extends string>(id: Id, Storage: StorageConstructor<Id>): BaseStorage {
  if (Storage.isValid()) return new Storage(id);
  return new MemoStorage(id);
}

export const getMemoStorage = (() => {
  const storageMap = new Map<string, MemoStorage>();
  return <Id extends string>(id: Id) => storageMap.get(id) ?? storageMap.set(id, new MemoStorage(id)).get(id) as MemoStorage;
})();

export const getLocalStorage = (() => {
  const storageMap = new Map<string, BaseStorage>();
  return <Id extends string>(id: Id) => storageMap.get(id) ?? storageMap.set(id, generateStorage(id, LocalStorage)).get(id) as BaseStorage;
})();

export const getSessionStorage = (() => {
  const storageMap = new Map<string, BaseStorage>();
  return <Id extends string>(id: Id) => storageMap.get(id) ?? storageMap.set(id, generateStorage(id, SessionStorage)).get(id) as BaseStorage;
})();
