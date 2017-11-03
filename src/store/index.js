import Vue from 'vue'
import Vuex from 'vuex'

import leftNavigation from './modules/leftNavigation'

Vue.use(Vuex)

export default new Vuex.Store({
  modules : {
    leftNaviModule : leftNavigation,
  }
});
