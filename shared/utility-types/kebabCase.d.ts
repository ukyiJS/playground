import type { CamelCase } from './camelCase';

type CamelCaseToKebabCase<S> = S extends `${infer T}${infer U}`
  ? `${T extends Capitalize<T> ? '-' : ''}${Lowercase<T>}${CamelCaseToKebabCase<U>}`
  : S;

export type KebabCase<S> = CamelCaseToKebabCase<CamelCase<S>>;

export type KebabCaseObject<T extends object, Deep extends boolean = false> = {
  [P in keyof T as KebabCase<P>]: T[P] extends object
    ? Deep extends true
      ? KebabCaseObject<T[P], Deep>
      : T[P]
    : T[P];
};