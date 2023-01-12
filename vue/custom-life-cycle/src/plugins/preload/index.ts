import type { DefineComponent } from 'vue';
import type { default as VueRouter } from 'vue-router';

type LazyComponent = Lazy<{ default: DefineComponent }>;

export const preload = (router: VueRouter): void => {
  const isLazyComponent = (component: unknown): component is LazyComponent => typeof component === 'function';

  router.beforeEach((to, from, next) => {
    const getPreloadFn = async (c: DefineComponent | LazyComponent) => {
      const component = isLazyComponent(c) ? await c?.().then(c => c.default) : c;
      const preload = component.preload;
      if (!preload) return;
      if (!component.created) component.created = function() {
        return null;
      };
      component.created = new Proxy(component.created, {
        async apply(target: () => void, thisArg: ObjectLiteral, args: unknown[]) {
          const data = await preload();
          Object.keys(data).forEach(key => thisArg[key] = data[key]);
          return Reflect.apply(target, thisArg, args);
        },
      });
    };
    const components = to.matched.flatMap(route => Object.values(route.components ?? {})) as (DefineComponent | LazyComponent)[];
    return Promise.all(components.map(getPreloadFn)).finally(next);
  });
};
