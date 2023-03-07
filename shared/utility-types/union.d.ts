export type Union<T> = T extends (infer E)[] ? E : T extends object ? keyof T : T;
