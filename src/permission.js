import router from './router';

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title}-飛樂米星空號` : '飛樂米星空號';
  if (to.meta.goBackIndex) {
    next('/');
  }
  // if (!/^\/maintenance(?:\/(?=$))?$/i.test(to.path)) {
  //   next('/maintenance');
  // }
  next();
});
