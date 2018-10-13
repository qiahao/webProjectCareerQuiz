export default [
  {
    path: '/',
    redirect: '/personalityTest'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/personalityTest',
    name: 'personalityTest',
    component: () => import('@/views/personalityTest/index.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }

]
