import Vue from 'vue'
import Router from 'vue-router'

const menu = r => require.ensure([], () => r(require('@/components/menu')), 'menu'); //主菜单
const login = r => require.ensure([], () => r(require('@/components/login')), 'login'); //登录
const changePassword = r => require.ensure([], () => r(require('@/components/changePassword')), 'changePassword'); //修改密码

Vue.use(Router);

let router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    }
  ]
});

router.beforeEach((to,from,next) => {
  window.document.title ="高铁一号线";
  next();
});

export default router;
