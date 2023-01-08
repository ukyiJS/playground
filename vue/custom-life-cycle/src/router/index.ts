import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const getRoutes = (): RouteRecordRaw[] => {
  const symbol = Symbol.for('routes');
  const modules = import.meta.glob<ObjectLiteral<{ [p: symbol]: RouteRecordRaw[] }>>('/src/router/routes/!(index).[j,t]s', { eager: true });
  return Object.values(modules).reduce<RouteRecordRaw[]>((acc, module) => {
    const routes = Object.values(module).map(routeSymbols => {
      const routes = routeSymbols[symbol];
      delete routeSymbols[symbol];
      return routes;
    });
    return acc.concat(...routes);
  }, []);
};

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: getRoutes(),
});
