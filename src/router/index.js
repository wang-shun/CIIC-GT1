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

import axios from "axios";

router.beforeEach((to,from,next) => {
  const token = JSON.parse(window.localStorage.getItem('userInfo'));
  if (token) {
    let param = new URLSearchParams();
    param.append("token", token.token);
    axios({
      method: "POST",
      url: `${getBasePath(process.env.env).serverPath}/api/getUserInfoByToken`,
      data: param,
    }).then(response => {
      if(response.data.code !== 0) {
        backToLogin();
      }
    });
  } else {
    backToLogin();
  }

  window.document.title ="高铁一号线";
  localStorage.setItem('level1',to.meta.level1);
  localStorage.setItem('level2',to.meta.level2);
  localStorage.setItem('level3',to.meta.level3);
  localStorage.setItem('level4',to.meta.level4);
  localStorage.setItem("openNames",[to.meta.openNames]);
  next();
});

function backToLogin() {
  window.location.href = `${getBasePath(process.env.env).basePath}:8070/#/`;
}

function getBasePath(env) {
  let basePath = '';
  let serverPath = '';
  switch (env) {
    case 'dev':
      basePath = 'http://localhost';
      serverPath = 'http://172.16.9.31';
      break;
    case 'sit':
      basePath = 'http://172.16.9.25';
      serverPath = 'http://172.16.9.24';
      break;
    case 'uat':
      basePath = 'http://172.16.9.60';
      serverPath = 'http://172.16.9.56';
      break;
    case 'prd':
      basePath = 'http://172.16.100.104';
      serverPath = 'http://172.16.100.103';
      break;
    default:
      basePath = 'http://localhost';
      serverPath = 'http://localhost';
      break;
  }
  return {basePath: basePath, serverPath: `${serverPath}:9621`};
}

export default router;
