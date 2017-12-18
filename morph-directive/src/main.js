import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import _store    from './store'
import VueMorph from './vue-morph'

Vue.use(Vuex)
const store = new Vuex.Store(_store)
Vue.use(VueMorph)
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  template: '<App/>',
  components: { App }
})
