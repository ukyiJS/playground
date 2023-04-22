import type { CamelCase } from './camelCase';

type CamelCaseToSnakeCase<S> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '_' : ''}${Lowercase<T>}${CamelCaseToSnakeCase<U>}`
  : S;

export type SnakeCase<S> = CamelCaseToSnakeCase<CamelCase<S>>;

export type SnakeCaseObject<T extends object, Deep extends boolean = false> = {
  [P in keyof T as SnakeCase<P>]: T[P] extends object
    ? Deep extends true
      ? SnakeCaseObject<T[P], Deep>
      : T[P]
    : T[P];
};