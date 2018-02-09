// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import VueAxios from 'vue-axios'

import 'iview/dist/styles/iview.css';
import '../static/css/style.css';   //修改全局樣式

Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueAxios,Axios);

Vue.prototype.$axios = Axios.create({
    baseURL: 'http://localhost:9621/api'
  }
);

const app = new Vue({
    router,
    render: h => h(App)
});

app.$mount('#app');
