// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import common from './assets/js/commonJs'

import 'iview/dist/styles/iview.css'
import '../static/css/style.css' // 全局样式
import '../static/css/overwrite.css' // 行内样式

Vue.config.productionTip = false;

Vue.use(iView)
Vue.use(VueAxios,Axios)

window.addEventListener('message', (event) => {
  const currentGoto = common.goto.CURRENT_GOTO().replace('http://', '').replace(/\//g, '').replace(/#/g, '')
  const origin = event.origin.replace('http://', '').replace(/\//g, '').replace(/#/g, '')
  if (currentGoto === origin) {
    const res = JSON.parse(event.data)
    if (res.code === 0) {
      const url = common.goto.CURRENT_GOTO()
      common.goto.REMOVE_CURRENT_GOTO()
      window.location.href = url
    }
  }
}, false)

const app = new Vue({
  router,
  render: h => h(App)
});

app.$mount('#app');
