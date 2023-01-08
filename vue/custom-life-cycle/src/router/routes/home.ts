import { routeConfig, routeView } from '@/utils/routeUtil';

export const homeRoute = routeConfig([
  {
    path: '/',
    name: 'home',
    component: routeView('HomePage'),
  },
  {
    path: '/about',
    name: 'about',
    component: routeView('AboutPage'),
  },
] as const);
