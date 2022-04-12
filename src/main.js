import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})
