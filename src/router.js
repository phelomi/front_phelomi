import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@/views/layout/layout.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: Layout,
      redirect: 'home',
      meta: {
        title: '首頁',
      },
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/pages/Home.vue'),
          meta: {
            title: '首页',
          },
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/pages/News.vue'),
          meta: {
            title: '首页',
          },
        },
      ],

    },
  ],
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('@/views/pages/Home.vue'),
  // },
});
