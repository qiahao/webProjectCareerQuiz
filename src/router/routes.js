export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index')
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index')
  },
  {
    path: '/personalityTest',
    name: 'personalityTest',
    meta: { title: '职业测评', menu: true },
    component: () => import('@/views/personalityTest/index.vue')
  },
  {
    path: '/occupationalValues',
    name: 'occupationalValues',
    meta: { title: '职业价值观测试', menu: true },
    component: () => import('@/views/occupationalValues/index.vue')
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
