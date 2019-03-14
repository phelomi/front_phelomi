import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../assets/bg_image/bg_placeholder.jpg',
  loading: '../assets/bg_image/bg_placeholder.jpg',
  attempt: 1,
});
