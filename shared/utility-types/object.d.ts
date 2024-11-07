/* eslint-disable @typescript-eslint/no-explicit-any */
type ObjectLiteral<T = any> = Record<string, T>;

type Keys<T extends ObjectLiteral> = (keyof T)[];
type Values<T extends ObjectLiteral> = (T[keyof T])[];
type Entries<T extends ObjectLiteral> = {
  [P in keyof T]-?: [P, T[P]]
}[keyof T][];

interface ObjectConstructor {
  keys<T extends ObjectLiteral>(o: T): Keys<T>;
  values<T extends ObjectLiteral>(o: T): Values<T>;
  entries<T extends ObjectLiteral>(o: T): Entries<T>;
}
