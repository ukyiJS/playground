import Vue from 'vue';
import { App } from '@/app';
import { focus } from '@/directives';
import { preload } from '@/plugins/preload';
import './assets/main.css';

App.init({
  beforeCreate(router, pinia) {
    preload(router);

    console.log('### beforeCreate');
  },
  mounted(app, router, pinia) {
    console.log('### mounted');
  },
  plugin(router, pinia) {
    console.log('### plugin');
  },
  directive(router, pinia) {
    console.log('### directive');
    Vue.directive('focus', focus);
  },
  onError(error, instance, info) {
    console.log(error);
  },
  onRouterError(error) {
    console.log(error);
  },
});
