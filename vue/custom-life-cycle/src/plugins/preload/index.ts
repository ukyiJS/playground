import type { DefineComponent } from 'vue';
import type { default as VueRouter } from 'vue-router';

type LazyComponent = Lazy<{ default: DefineComponent }>;

export const preload = (router: VueRouter): void => {
  const isLazyComponent = (component: unknown): component is LazyComponent => typeof component === 'function';
  const getComponents = (component: unknown): DefineComponent[] => Object.values(component ?? {}) as DefineComponent[];
  const defaultCreated = function() {
    return undefined;
  };

  router.beforeEach((to, from, next) => {
    const getPreloadFn = async (c: DefineComponent) => {
      const component = isLazyComponent(c) ? await c?.().then(c => c.default) : c;

      const preload = component.preload;
      if (!preload) return getComponents(component.components).forEach(getPreloadFn);

      component.created = new Proxy(component.created ?? defaultCreated, {
        async apply(target: typeof defaultCreated, thisArg: ObjectLiteral, args: unknown[]) {
          const data = await preload();
          Object.keys(data).forEach(key => thisArg[key] = data[key]);
          return Reflect.apply(target, thisArg, args);
        },
      });
    };
    const components = to.matched.flatMap(route => getComponents(route.components));
    return Promise.all(components.map(getPreloadFn)).finally(next);
  });
};
