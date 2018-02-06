import Vue from 'vue'
import Router from 'vue-router'

const menu = r => require.ensure([], () => r(require('@/components/menu')), 'menu') //主菜单
const login = r => require.ensure([], () => r(require('@/components/login')), 'login') //登录

Vue.use(Router)
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
      component: menu,
    }
  ]
})

router.beforeEach((to,from,next)=>{
  window.document.title ="高铁一号线";
    localStorage.setItem('level1',to.meta.level1);
    localStorage.setItem('level2',to.meta.level2);
    localStorage.setItem('level3',to.meta.level3);
    localStorage.setItem('level4',to.meta.level4);
    localStorage.setItem("openNames",[to.meta.openNames]);
    next();
});
router.afterEach((to,from)=>{});


export default router;
