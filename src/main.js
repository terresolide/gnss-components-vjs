import Vue from 'vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);
// import App from './App.vue'


import vueCustomElement from 'vue-custom-element';
Vue.use(vueCustomElement);

Vue.customElement('spot-gins', () => new Promise((resolve) => {
  require(['./components/spot-gins.vue'], (SpotGins) => resolve(SpotGins.default))
}))
//Vue.config.productionTip = false
//
//new Vue({
//  render: h => h(App),
//}).$mount('#app')
