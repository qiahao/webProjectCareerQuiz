import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

Vue.use(Router)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: routes
})
export default router
