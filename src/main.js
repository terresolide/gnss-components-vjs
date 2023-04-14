import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import VueResource from 'vue-resource';
Vue.use(VueResource);
// import {BootstrapVue}  from 'bootstrap-vue'
// console.log(BootstrapVue)
// Vue.use(IconsPlugin)
import App from './App.vue'
import router from './router'
import makeStore from './store'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

let config = {}
if (typeof gnssConfig != 'undefined') {
  config = JSON.parse(gnssConfig.innerHTML)
} 

const store = makeStore(config)

//import vueCustomElement from 'vue-custom-element';
//Vue.use(vueCustomElement);

//Vue.customElement('json-div', () => new Promise((resolve) => {
//  require(['./components/json-div.vue'], (JsonDiv) => resolve(JsonDiv.default))
//}))

//Vue.customElement('spot-gins', () => new Promise((resolve) => {
//  require(['./components/spot-gins.vue'], (SpotGins) => resolve(SpotGins.default))
//}))
//Vue.config.productionTip = false
//

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
