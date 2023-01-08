import { createApp } from 'vue';
import { App } from '@/app';
import AppComponent from '@/App.vue';
import { focus } from '@/directives';
import './assets/main.css';

App.init(createApp(AppComponent), {
  beforeCreate(router, pinia) {
    console.log('### beforeCreate');
  },
  mounted(router, pinia) {
    console.log('### mounted');
  },
  plugin(app, router, pinia) {
    console.log('### plugin');
  },
  directive(app, router, pinia) {
    console.log('### directive');
    app.directive('focus', focus);
  },
  onError(error, instance, info) {
    console.log(error);
  },
  onRouterError(error, to, from) {
    console.log(error);
  },
});
