import { createRouter, createWebHistory } from 'vue-router'
import Home from '../page/Home'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/VueFile',
      name: 'VueFile',
      component: import('../page/VueFile.vue')
    }
  ]
})
