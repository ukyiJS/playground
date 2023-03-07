export type Optional<T extends object, K extends keyof T = keyof T> = { [P in keyof Pick<T, K>]?: T[P]; } & { [P in Exclude<keyof T, K>]: T[P]; };
