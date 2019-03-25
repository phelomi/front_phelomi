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
            title: '首頁',
          },
        },
        {
          path: 'news',
          name: 'news',
          component: () => import('@/views/pages/News.vue'),
          meta: {
            title: '最新消息',
          },
        },
        {
          path: 'follow',
          name: 'follow',
          component: () => import('@/views/pages/Follow.vue'),
          meta: {
            title: '跟我醬玩！',
          },
        },
        {
          path: 'rooms',
          name: 'rooms',
          component: () => import('@/views/pages/Rooms.vue'),
          meta: {
            title: '房間介紹',
          },
        },
        {
          path: 'location',
          name: 'location',
          component: () => import('@/views/pages/Location.vue'),
          meta: {
            title: '交通位置',
          },
        },
        // {
        //   path: 'order',
        //   name: 'order',
        //   component: () => import('@/views/pages/Order.vue'),
        //   meta: {
        //     title: '預定房型',
        //   },
        // },
      ],
    },
    // 維護頁
    {
      path: '/maintenance',
      component: () => import('@/views/pages/Maintenance.vue'),
      meta: {
        title: '維護中',
      },
    },
    // 404
    {
      path: '*',
      component: () => import('@/views/pages/Error.vue'),
      meta: {
        title: '找不到頁面',
        goBackIndex: true,
      },
    },
  ],
});
