import type { Component } from 'vue';
import type { RouteRecordRaw } from 'vue-router';

export const routeView = (name: `${string}Page`) => (): Promise<Component> => import(`@/pages/${name}.vue`);

type RouteConfig = Omit<RouteRecordRaw, 'path' | 'name'> & {
  readonly path: string;
  readonly name: string;
}
type RouteIterator<Name> = {
  [Symbol.iterator](): IterableIterator<Name>;
}
export const routeConfig = <C extends RouteConfig, Name extends { [P in C['name']]: P }, Iterator extends RouteIterator<C['name']>>(routes: readonly C[]): Name & Iterator => routes.reduce((acc, { name }, index) => ({
  ...acc,
  [name]: name,
  * [Symbol.iterator]() {
    if (index < routes.length - 1) return;
    for (const key of Object.keys(acc)) {
      yield key;
      yield name;
    }
  },
}), { [Symbol.for('routes')]: routes } as ObjectLiteral) as Name & Iterator;
