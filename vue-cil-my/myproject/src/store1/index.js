import Vue from 'vue'
import Vuex from 'vuex'
// 让vuex作为vue的插件来使用
Vue.use(Vuex)

// 创建一个容器
let store = new Vuex.Store({
  state:{
    id : localStorage.getItem('id')?localStorage.getItem('id'):'',
    class : localStorage.getItem('class')?localStorage.getItem('class'):'',
    isMonitor:localStorage.getItem('isMonitor')?localStorage.getItem('isMonitor'):'0',
    isLogin:localStorage.getItem('isLogin')?localStorage.getItem('isLogin'):'false',
    count:localStorage.getItem('count')?localStorage.getItem('count'):'false',
  },
  mutations: {
    //修改学号
    addId (state, payload) {
      console.log(payload)
      state.id = payload
      localStorage.setItem('id',payload);
    },
    //修改登陆状态
    Login (state,payload) {
      console.log(payload)
      state.isLogin = payload
      localStorage.setItem('isLogin',payload);
    },
    //修改班级
    addClass(state, payload) {
      console.log(payload)
      state.class = payload
      localStorage.setItem('class',payload);
    },
    //是否班长
    addMonitor(state, payload) {
      console.log(payload)
      state.isMonitor = payload
      localStorage.setItem('isMonitor',payload);
    },
    //班级人数
    addCount(state, payload) {
      console.log(payload)
      state.count = payload
      localStorage.setItem('count',payload);
    }

  }

})

// 把这个store实例导出 方便在vue中注入
export default store
