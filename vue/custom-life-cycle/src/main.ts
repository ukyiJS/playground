import { createApp } from 'vue';
import { App } from '@/app';
import AppComponent from '@/App.vue';
import { focus } from '@/directives';
import './assets/main.css';

const app = createApp(AppComponent);

App.init(app, {
  beforeCreate(router, pinia) {
    console.log('### beforeCreate');
  },
  mounted(router, pinia) {
    console.log('### mounted');
  },
  plugin(router, pinia) {
    console.log('### plugin');
    app.use(router);
    app.use(pinia);
  },
  directive(router, pinia) {
    console.log('### directive');
    app.directive('focus', focus);
  },
  errorHandler(error, instance, info) {
    console.log(error);
  },
  routerErrorHandler(error, to, from) {
    console.log(error);
  },
});
