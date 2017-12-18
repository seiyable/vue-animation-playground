import Vue from 'vue'
import App from './App'
import VueMorph from './vue-morph'
Vue.use(VueMorph)

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
