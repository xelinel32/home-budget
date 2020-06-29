import Vue from 'vue';
import Router from 'vue-router';
import fb from 'firebase/app';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty', title: 'Логин' },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: { layout: 'empty', title: 'Регистрация' },
      component: () => import('../views/Register.vue')
    },
    {
      path: '/',
      name: 'home',
      meta: { layout: 'main', auth: true, title: 'Домашняя страница' },
      component: () => import('../views/Home.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth: true, title: 'Категории' },
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      meta: { layout: 'main', auth: true, title: 'Подробно' },
      component: () => import('../views/Detail.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth: true, title: 'История' },
      component: () => import('../views/History.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main', auth: true, title: 'Планирование' },
      component: () => import('../views/Planning.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true, title: 'Профиль' },
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/record',
      name: 'record',
      meta: { layout: 'main', auth: true, title: 'Запись' },
      component: () => import('../views/Record.vue')
    }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  const currntUser = fb.auth().currentUser;
  const requireAuth = to.meta.auth;

  if (requireAuth && !currntUser) {
    next('/login?message=login');
  } else {
    next();
  }
});
