/**
 * Router Configuration
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// vue 3
//
// import { createRouter, createWebHashHistory } from 'vue-router'
const Station = () => import('../components/station.vue')
const Solution = () => import('../components/solution.vue')
const FileList = () => import('../components/file-list.vue')
// import Station from '../components/station.vue'
// import Map from '../components/map.vue'
import Empty from '../components/empty.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Empty
  },
   {
    path: '/station/:name',
    name: 'stations',
    component: Station
  },
   {
    path: '/station/:name/:id',
    name: 'station',
    component: Station
  },
  {
    path: '/solution/:name',
    name: 'solution',
    component: Solution
  },
  {
    path: '/files',
    name: 'files',
    component: FileList
  }
]

const router = new Router({
 // history: createWebHistory(process.env.BASE_URL),
 // history: createWebHashHistory(),
  routes
})

export default router