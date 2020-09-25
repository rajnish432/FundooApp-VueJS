import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './Route'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)
Vue.use(VueRouter)
Vue.config.productionTip = false

const router = new VueRouter({
  routes: Routes
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
