export type CamelCase<S extends string, Separator extends string = ' ' | '-' | '_', Beginning extends boolean = true> = S extends `${infer Character}${infer Rest}`
  ? Character extends Separator
    ? `${CamelCase<Capitalize<Rest>, Separator, Beginning>}`
    : `${Beginning extends true ? Lowercase<Character> : Character}${CamelCase<Rest, Separator, false>}`
  : '';

export type CamelCaseObject<T extends object, Deep extends boolean = false> = {
  [P in keyof T as CamelCase<P>]: T[P] extends object
    ? Deep extends true
      ? CamelCaseObject<T[P], Deep>
      : T[P]
    : T[P];
};