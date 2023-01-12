import Vue from 'vue';
import type { RouteConfig } from 'vue-router';
import VueRouter from 'vue-router';

const getRoutes = (): RouteConfig[] => {
  const symbol = Symbol.for('routes');
  const modules = import.meta.glob<ObjectLiteral<{ [p: symbol]: RouteConfig[] }>>('/src/router/routes/!(index).[j,t]s', { eager: true });
  return Object.values(modules).reduce<RouteConfig[]>((acc, module) => {
    const routes = Object.values(module).map(routeSymbols => {
      const routes = routeSymbols[symbol];
      delete routeSymbols[symbol];
      return routes;
    });
    return acc.concat(...routes);
  }, []);
};

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: getRoutes(),
});
