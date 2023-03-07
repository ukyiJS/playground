import type { BaseStorage, StorageConstructor } from './types';
import { generateKey } from './utils';

export const createStorage = <Id extends string, S extends Storage>(storage: S): StorageConstructor<Id> => class implements BaseStorage {
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

  deserialize<T>(value: string): T | null {
    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  }

  serialize(value: unknown): string {
    return JSON.stringify(value);
  }

  getItem<T>(key: string): T | null {
    const item = storage.getItem(`${this._id}#${key}`);
    return item ? this.deserialize<T>(item) : null;
  }

  setItem(key: string, value: unknown): this {
    storage.setItem(`${this._id}#${key}`, this.serialize(value));
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
    this.keys().forEach(key => this.removeItem(key));
    return this;
  }

  get length() {
    return this.keys().length;
  }

  key(index: number): string | null {
    return this.keys()[index];
  }

  keys(): string[] {
    const regExp = RegExp(`^${this._id}#`);
    return Object.keys(storage.valueOf()).reduce<string[]>((acc, key) => regExp.test(key) ? [...acc, key.replace(regExp, '')] : acc, []);
  }

  valueOf<T extends ObjectLiteral>(): T {
    return this.keys().reduce((acc, key) => ({ ...acc, [key]: this.getItem(key) }), {} as T);
  }
};