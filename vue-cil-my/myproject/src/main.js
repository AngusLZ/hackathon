import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import './iconfont.css'
import axios from 'axios'
import store from './store1/index'
import './css/simplecss.css'
import './file/file'
import Vuex from "vuex";
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
