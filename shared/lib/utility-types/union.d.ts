/* eslint-disable @typescript-eslint/no-explicit-any */

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void
  ? I
  : never;

type UnionToOvlds<U> = UnionToIntersection<U extends any ? (f: U) => void : never>;

type PopUnion<U> = UnionToOvlds<U> extends (a: infer A) => void ? A : never;

type IsUnion<T> = [T] extends [UnionToIntersection<T>] ? false : true;

/**
 * @example
 *   type Props = 'id' | 'name';
 *   type Result = UnionToArray<Props>; // ['id' | 'name'];
 */
export type UnionToArray<T, A extends unknown[] = []> = IsUnion<T> extends true
  ? UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : [T, ...A];

/**
 * @example
 *   type Props = ['id', 'name'];
 *   type Result = Union<Props>; // 'id' | 'name';
 *
 *   type Props = { id: number; name: string; }
 *   type Result = Union<Props>; // 'id' | 'name';
 */
export type Union<T> = T extends (infer E)[] ? E : T extends object ? keyof T : T;
