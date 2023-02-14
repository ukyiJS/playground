import type { Component } from 'vue';
import type { RouteConfig as _RouteConfig } from 'vue-router';

export const routeView = (name: `${string}Page`) => (): Promise<Component> => import(`@/pages/${name}.vue`);

interface RouteConfig extends Omit<_RouteConfig, 'path' | 'name' | 'children'> {
  readonly path: string;
  readonly name?: string;
  readonly children?: readonly RouteConfig[];
}

type RouteChildren<Config extends RouteConfig['children']> = Config extends readonly RouteConfig[] ? Config[number] : never;
type RouteNames<Config extends RouteConfig> = Config['name'] | RouteChildren<Config['children']>['name'];
type RouteNameObject<Name> = { [P in Name extends string ? Name : never]: P };

export const routeConfig = <C extends RouteConfig, Name extends RouteNameObject<RouteNames<C>>>(routes: readonly C[]): Name => {
  const route = routes.reduce<ObjectLiteral>((acc, { name, children }) => {
    const childrenNames = children?.reduce<ObjectLiteral<string>>((_acc, c) => (c.name ? { ..._acc, [c.name]: c.name } : _acc), {}) ?? {};
    return (name ? { ...acc, ...childrenNames, [name]: name } : acc);
  }, { [Symbol.for('routes')]: routes }) as Name;
  return route as Name;
};
