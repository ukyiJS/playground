import { PiniaVuePlugin, createPinia } from 'pinia';
import Vue from 'vue';

Vue.use(PiniaVuePlugin);

export const pinia = createPinia();
