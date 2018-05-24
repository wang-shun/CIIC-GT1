// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import 'iview/dist/styles/iview.css';
import '../static/css/style.css';   // 全局样式
import '../static/css/overwrite.css'; // 行内样式

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueAxios,Axios);

const app = new Vue({
  router,
  render: h => h(App)
});

app.$mount('#app');
