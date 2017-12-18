import Vue from 'vue'
import App from './App'

Vue.directive('morph', {
  componentUpdated: function (el, binding, vnode) {
    console.log('----- in morph directive COMPONENT UPDATED -----')
    console.log('el', el)
    console.log('binding', binding)
    console.log('vnode', vnode)
    console.log('------------------------------')
  },
  inserted: function (el, binding, vnode) {
    // console.log('----- in morph directive INSERTED -----')
    // console.log('el', el)
    // console.log('binding', binding)
    // console.log('vnode', vnode)
    // console.log('------------------------------')
  },
  updated: function (el, binding, vnode) {
    console.log('----- in morph directive UPDATED -----')
    console.log('el', el)
    console.log('binding', binding)
    console.log('vnode', vnode)
    console.log('------------------------------')
  },
  bind: function (el, binding, vnode) {
    // console.log('----- in morph directive BINDED -----')
    // console.log('el', el)
    // console.log('binding', binding)
    // console.log('vnode', vnode)
    // console.log('------------------------------')

    // ------------------- validations -------------------
    let targetElementId = binding.value.targetElementId
    if (typeof targetElementId !== 'string') {
      console.error('targetElementId is not set or an invalid value.')
      return
    }

    let eventType = binding.value.triggerEventType
    if (typeof eventType !== 'string') {
      console.error('triggerEventType is not set or an invalid value.')
      return
    }

    let params = binding.value.params
    if (params && typeof params !== 'object') {
      console.error('params is not an object.')
      return
    }

    let easing = binding.value.easing
    if (typeof easing !== 'string') {
      console.error('easing is not set or an invalid value.')
      return
    }

    let duration = binding.value.duration
    if (!Number.isInteger(duration)) {
      console.error('duration is not set or an invalid value.')
      return
    }

    let callback = binding.value.callback
    if (callback && !isFunction(callback)) {
      console.error('callback is not a function.')
      return
    }
    // ---------------------------------------------------

    // attach event listner to trigger morphing
    el.addEventListener(eventType, () => {
      // find a morpying layer component and call its medthod
      const MorphingLayer = vnode.context.$root.$children[0].$refs['morphing-layer']
      MorphingLayer.startMorphing({
        originElement: el,
        targetElementId: targetElementId,
        params: params,
        easing: easing,
        duration: duration,
        callback: callback
      })
    })
  }
})

function isFunction (functionToCheck) {
  let getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
