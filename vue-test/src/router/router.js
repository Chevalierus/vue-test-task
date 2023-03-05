import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'

import YourComponent from './components/YourComponent.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '?',
      name: 'App',
      component: App
    }
  ]
})

export default router