/**
 * Router Configuration
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// vue 3
//
// import { createRouter, createWebHashHistory } from 'vue-router'
import Station from '../components/station.vue'
import Spotgins from '../components/spot-gins.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Spotgins
  },
   {
    path: '/station/:id',
    name: 'station',
    component: Station
  },
]

const router = new Router({
 // history: createWebHistory(process.env.BASE_URL),
 // history: createWebHashHistory(),
  routes
})

export default router