import type { Pinia } from 'pinia';
import type { AppConfig, ComponentOptions, ComponentPublicInstance, App as VueApp } from 'vue';
import type { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { router } from '@/router';
import { pinia } from '@/stores';

type AppOptions<E, R> = {
  beforeCreate?(router: Router, pinia: Pinia): void | Promise<void>;
  mounted?(router: Router, pinia: Pinia): void | Promise<void>;
  mixins?: ComponentOptions[]
  directive?(router: Router, pinia: Pinia): void;
  plugin?(router: Router, pinia: Pinia): void;
  errorHandler?(err: E, instance: ComponentPublicInstance | null, info: string): void;
  routerErrorHandler?(error: R, to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded): void;
}

export class App<E = Error, R = Error> {
  static #instance: App;
  readonly #app: VueApp<Element>;
  readonly #options: AppOptions<E, R>;
  readonly #router: Router = router;
  readonly #pinia: Pinia = pinia;

  static init<E = Error, R = Error>(app: VueApp<Element>, options: AppOptions<E, R>): App {
    if (!App.#instance) App.#instance = new App<E, R>(app, options) as App;
    return App.#instance;
  }

  constructor(app: VueApp<Element>, options: AppOptions<E, R>) {
    this.#app = app;
    this.#options = options;

    this.#addOptions();
    this.#mount().finally(() => console.log('🚀 app mounted'));
    this.#addErrorHandler();
  }

  #addOptions() {
    this.#options.plugin?.(this.#router, this.#pinia);
    this.#options.mixins?.forEach(this.#app.mixin);
    this.#options.directive?.(this.#router, this.#pinia);
  }

  async #mount() {
    await this.#options.beforeCreate?.(this.#router, this.#pinia);
    this.#app.mount('#app');
    this.#options.mounted?.(this.#router, this.#pinia);
  }

  #addErrorHandler() {
    if (this.#options.routerErrorHandler) this.#router.onError(this.#options.routerErrorHandler);
    if (this.#options.errorHandler) this.#app.config.errorHandler = this.#options.errorHandler as AppConfig['errorHandler'];
  }
}
