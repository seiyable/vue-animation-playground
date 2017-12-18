const eventType = 'morph'

Vue.directive('morph', {
  bind: function (el, binding, vnode) {
    // console.log('----- in morph directive BINDED -----')
    // console.log('el', el)
    // console.log('binding', binding)
    // console.log('vnode', vnode)
    // console.log('------------------------------')

    // attach event listner to trigger morphing
    el.addEventListener(eventType, (event) => {
      console.log(event)
      const payload = event.detail
      validate(payload)

      // find a morpying layer component and call its medthod
      const MorphingLayer = vnode.context.$root.$children[0].$refs['morphing-layer']
      MorphingLayer.startMorphing({
        originElement: el,
        targetElementId: payload.targetElementId,
        params: payload.params,
        easing: payload.easing,
        duration: payload.duration,
        callback: payload.callback
      })
    })
  }
})

function isFunction (functionToCheck) {
  let getType = {}
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]'
}

/* validate payload */
function validate (payload) {
  let targetElementId = payload.targetElementId
  if (typeof targetElementId !== 'string') {
    console.error('targetElementId is not set or an invalid value.')
    return
  }

  let params = payload.params
  if (params && typeof params !== 'object') {
    console.error('params is not an object.')
    return
  }

  let easing = payload.easing
  if (typeof easing !== 'string') {
    console.error('easing is not set or an invalid value.')
    return
  }

  let duration = payload.duration
  if (!Number.isInteger(duration)) {
    console.error('duration is not set or an invalid value.')
    return
  }

  let callback = payload.callback
  if (callback && !isFunction(callback)) {
    console.error('callback is not a function.')
    // return
  }
}
