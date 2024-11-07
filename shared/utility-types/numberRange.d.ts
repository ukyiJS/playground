type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

/**
 * @example
 *   type Result = NumberRange<1, 10>; // 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
 */
export type NumberRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;
