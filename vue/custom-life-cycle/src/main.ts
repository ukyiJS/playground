import { createApp } from 'vue';
import { App } from '@/app';
import AppComponent from '@/App.vue';
import { focus } from '@/directives';
import { router } from '@/router';
import { pinia } from '@/stores';
import './assets/main.css';

const app = createApp(AppComponent);

App.init(app, {
  beforeCreate(router, pinia) {
    console.log('### beforeCreate');
  },
  mounted(router, pinia) {
    console.log('### mounted');
  },
  plugin() {
    app.use(router);
    app.use(pinia);
  },
  directive() {
    app.directive('focus', focus);
  },
  errorHandler(error, instance, info) {
    console.log(error);
  },
  routerErrorHandler(error, to, from) {
    console.log(error);
  },
});
