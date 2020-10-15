import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import i18n from './i18n'
import store from './store'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

export const eventBus = new Vue();

