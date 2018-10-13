import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import Vue from 'vue'
import ElementUI from 'element-ui'

import App from './App'
import router from './router'
// import store from './store'
// import config from '@/config'
import '@/filters'
// import axios from "axios"
import '@/icons' // icon
Vue.use(ElementUI)

Vue.config.productionTip = false

// import vmaAssist from 'vma-vue-assist'
// let _requestLoading
// Vue.use(vmaAssist, {
//   plugins: {
//     axios: {
//       // 将extend到axios.defaults
//       defaults: {
//         baseURL: config.host,
//         // headers: {
//         //   session_id: decodeURIComponent(VueCookie.get('session_id') || '')
//         // }
//         responseType: 'text'
//       },
//       // 所有的拦截器只要配置为false则不启用
//       interceptor: {
//         removeEmpty: true,
//         // 全局错误拦截器
//         errorHandle: {
//           handleError(error) {
//             console.log(JSON.stringify(error))
//             Message({
//               message: error.response.data.msg,
//               type: 'warning',
//               duration: 10000,
//               showClose: true
//             })
//           }
//         },
//         dataToUnderline: false,
//         // http请求显示加载中
//         loading: {
//           // 第一个http请求发起时
//           // Vue.$indicator.open()
//           showLoader() {
//             _requestLoading = Loading.service({
//               target: '#mainContainer'
//             })
//           },
//           // 最后一个http请求结束时
//           hideLoader() {
//             // Vue.$nextTick(function() {
//             // })
//             // Vue.$indicator.close()
//             _requestLoading.close()
//           }
//         },
//         returnResponseData: true
//       },
//       transformResponse: {
//         // response.data下划线转驼峰
//         hump: true
//       }
//     }
//   }
// })
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
