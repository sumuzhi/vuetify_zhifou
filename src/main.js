import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import { highlight } from './plugins/highlight'
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// Vue.directive('highlight', highlight)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
