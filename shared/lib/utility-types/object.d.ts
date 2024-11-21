type ObjectLiteral<T = unknown> = Record<string, T>;

type Keyof<T extends ObjectLiteral> = Exclude<keyof T, symbol>;

type Keys<T extends ObjectLiteral> = (Keyof<T>)[];
type Values<T extends ObjectLiteral> = (T[Keyof<T>])[];
type Entries<T extends ObjectLiteral> = {
  [P in Keyof<T>]-?: [P, T[P]]
}[Keyof<T>][];

interface ObjectConstructor {
  keys<T extends ObjectLiteral>(o: T): Keys<T>;
  values<T extends ObjectLiteral>(o: T): Values<T>;
  entries<T extends ObjectLiteral>(o: T): Entries<T>;
}
