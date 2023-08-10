import type { Pinia } from 'pinia';
import Vue from 'vue';
import type { ComponentOptions, CreateElement } from 'vue';
import type { default as VueRouter } from 'vue-router';
import AppComponent from '@/App.vue';
import { router } from '@/router';
import { pinia } from '@/stores';

type VueErrorHandler = {
  (err: Error, vm: Vue, info: string): void;
};
type RouterErrorHandler = {
  (err: Error): void;
};

type AppOptions<E extends Error, R extends Error> = {
  beforeCreate?(router: VueRouter, pinia: Pinia): void | Promise<void>;
  mounted?(app: Vue, router: VueRouter, pinia: Pinia): void | Promise<void>;
  mixins?: ComponentOptions<Vue>[]
  directive?(router: VueRouter, pinia: Pinia): void;
  plugin?(router: VueRouter, pinia: Pinia): void;
  onError?(err: E, vm: Vue, info: string): void;
  onRouterError?(error: R): void;
}

export class App<E extends Error = Error, R extends Error = Error> {
  static #instance: unknown;
  readonly #options: AppOptions<E, R>;
  readonly #router: VueRouter = router;
  readonly #pinia: Pinia = pinia;

  static init<E extends Error = Error, R extends Error = Error>(options: AppOptions<E, R>): App<E, R> {
    if (!App.#instance) App.#instance = new App<E, R>(options);
    return App.#instance as App<E, R>;
  }

  constructor(options: AppOptions<E, R>) {
    this.#options = options;

    this.#addOptions();
    this.#mount().finally(() => console.log('🚀 app mounted'));
    this.#addErrorHandler();
  }

  #addOptions() {
    this.#options.plugin?.(this.#router, this.#pinia);
    this.#options.mixins?.forEach(Vue.mixin);
    this.#options.directive?.(this.#router, this.#pinia);
  }

  async #mount() {
    await this.#options.beforeCreate?.(this.#router, this.#pinia);
    const app = new Vue({ router, pinia, render: (h: CreateElement) => h(AppComponent) }).$mount('#app');
    this.#options.mounted?.(app, this.#router, this.#pinia);
  }

  #addErrorHandler() {
    if (this.#options.onRouterError) this.#router.onError(this.#options.onRouterError as RouterErrorHandler);
    if (this.#options.onError) Vue.config.errorHandler = this.#options.onError as VueErrorHandler;
  }
}
