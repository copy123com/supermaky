import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {request} from './network/request'

Vue.config.productionTip = false

//给$bus赋予vue实例，搭建组件间的通信
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')

request({
  url:'/home/multidata'
}).then(config => {
  console.log(config)
}).catch(err => {
  console.log(err)
})
