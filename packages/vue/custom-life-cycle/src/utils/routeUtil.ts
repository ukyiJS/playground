import camelCase from 'lodash-es/camelCase';
import type { CamelCase } from 'shared/utility-types/camelCase';
import type { Component } from 'vue';
import type { RouteConfig as _RouteConfig } from 'vue-router';

export const routeView = (name: `${string}Page`) => (): Promise<Component> => import(`@/pages/${name}.vue`);

type RouteConfig = Omit<_RouteConfig, 'children' | 'name' | 'path'> & {
  readonly path: string;
  readonly name?: string;
  readonly children?: readonly RouteConfig[];
};

type ObjectLiteral = Record<string, string>;
type RouteNameObject<Name extends string> = { [P in Name as CamelCase<P>]: P };

type RouteName<Name> = Name extends string ? Name : never;
type RouteChildren<C extends RouteConfig['children']> = C extends Required<C> ? C[number] : never;

type RouteNames<Config extends RouteConfig> = Config extends RouteConfig
  ? RouteName<Config['name']> | RouteNames<RouteChildren<Config['children']>>
  : never;

export const routeConfig = <const Config extends RouteConfig, Route extends RouteNameObject<RouteNames<Config>>>(routes: readonly Config[]): Route => {
  const getChildrenNames = (children?: readonly RouteConfig[] | undefined): ObjectLiteral => children?.reduce((acc, c) => c.name ? { ...acc, [camelCase(c.name)]: c.name, ...getChildrenNames(c.children) } : acc, {}) ?? {};

  const route = routes.reduce<ObjectLiteral>((acc, { name, children }) => {
    const childrenNames = getChildrenNames(children);
    const result = { ...acc, ...childrenNames };

    return name ? { ...result, [camelCase(name)]: name } : result;
  }, { [Symbol.for('routes')]: routes });

  return route as Route;
};
