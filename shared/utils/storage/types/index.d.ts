export interface BaseStorage extends Storage {
  getItem<T = string>(key: string): T | null;
  setItem(key: string, value: unknown): this;
  removeItem(key: string): this;
  pickItem<T = string>(key: string): T | null;
  clear(): this;
  valueOf<T extends Record<string, unknown> = Record<string, string>>(): T;
  key(index: number): string | null;
  keys(): string[];
  get length(): number;
  serialize(value: unknown): string;
  deserialize<T>(value: string): T | null;
}

export interface StorageConstructor<Id extends string = string> {
  new(id: Id): BaseStorage;
  prototype: BaseStorage;
  isValid(): boolean;
}
