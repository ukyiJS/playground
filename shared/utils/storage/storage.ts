/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStorage } from './factory';
import { storageProxy } from './storageProxy';
import type { BaseStorage, StorageConstructor } from './types';
import { isString } from './utils';

export class MemoStorage<Id extends string> implements BaseStorage {
  readonly #id: Id;
  readonly #storage = new Map<string, string>();

  constructor(id: Id) {
    this.#id = id;

    return new Proxy<MemoStorage<Id>>(this, storageProxy());
  }

  deserialize<T>(value: string): T | null {
    try {
      return JSON.parse(value);
    }
    catch {
      return null;
    }
  }

  serialize(value: unknown): string {
    return JSON.stringify(value);
  }

  getItem<T>(key: string): T | null {
    const item = this.#storage.get(`${this.#id}#${key}`);

    return item ? this.deserialize(item) : null;
  }

  setItem(key: string, value: unknown): this {
    this.#storage.set(`${this.#id}#${key}`, this.serialize(value));

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

export class LocalStorage<Id extends string> extends createStorage(localStorage) {
  constructor(id: Id) {
    super(id);

    return new Proxy<LocalStorage<Id>>(this, storageProxy());
  }
}

export class SessionStorage<Id extends string> extends createStorage(sessionStorage) {
  constructor(id: Id) {
    super(id);

    return new Proxy<SessionStorage<Id>>(this, storageProxy());
  }
}

export const generateStorage = <Id extends string>(id: Id, storage: StorageConstructor<Id> | 'localStorage' | 'sessionStorage'): BaseStorage => {
  const Storage = isString(storage)
    ? storage === 'localStorage'
      ? LocalStorage<Id>
      : SessionStorage<Id>
    : storage;

  return Storage.isValid() ? new Storage(id) : new MemoStorage<Id>(id);
};

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
