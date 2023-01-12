/* eslint-disable @typescript-eslint/no-explicit-any */
type ObjectLiteral<T = any> = {
  [P in string]: T
}

type Keys<T extends ObjectLiteral> = (keyof T)[];
type Values<T extends ObjectLiteral> = (T[keyof T])[];
type Entries<T extends ObjectLiteral> = {
  [P in keyof T]-?: [P, T[P]]
}[keyof T][];

type Lazy<T> = () => Promise<T>;
