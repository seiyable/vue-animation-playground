<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    v-show="state === 'morphing'"
    id="morphing-layer">
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import anime from 'animejs'
import camelCase from 'camelcase'

export default {
  name: 'morphing-layer',
  data () {
    return {
      state: 'origin', // 'origin' or 'morphing' or 'target'
      svgWidth: 0,
      svgHeight: 0,
      origin: {},
      target: {},
      current: {}
    }
  },
  created () {
    this.initData()
  },
  methods: {
    /* start morphing */
    startMorphing ({originElement, targetElementId, params, easing, duration, callback}) {
      console.log('in morphing layer...')
      this.initData()
      this.prepareData(originElement, targetElementId, params)
      this.addMorphDiv()
      this.morph(params, easing, duration, callback)
    },
    /* initialize data */
    initData () {
      this.origin = {}
      this.target = {}
      this.current = {}
    },
    /* prepare data */
    prepareData (originElement, targetElementId, params) {
      this.origin.el = originElement
      this.target.el = document.getElementById(targetElementId)

      // set parameters for the origin box
      let originBcr = this.origin.el.getBoundingClientRect()
      this.origin.absX = originBcr.left
      this.origin.absY = originBcr.top
      this.origin.w = this.origin.el.offsetWidth
      this.origin.h = this.origin.el.offsetHeight

      // set parameters for the target box
      let targetBcr = this.target.el.getBoundingClientRect()
      this.target.absX = targetBcr.left
      this.target.absY = targetBcr.top
      this.target.w = this.target.el.offsetWidth
      this.target.h = this.target.el.offsetHeight

      // set additional parameters if any
      let originComputedStyle = window.getComputedStyle(this.origin.el)
      let targetComputedStyle = window.getComputedStyle(this.target.el)
      // for (let i = 0; i < params.length; i++) {
      //   let propName = params[i]
      //   this.origin[camelCase(propName)] = originComputedStyle.getPropertyValue(propName)
      //   this.target[camelCase(propName)] = targetComputedStyle.getPropertyValue(propName)
      // }
      for (let prop in params) {
        let val = params[prop]
        this.origin[camelCase(prop)] = originComputedStyle.getPropertyValue(prop)
        if (val === true) {
          this.target[camelCase(prop)] = targetComputedStyle.getPropertyValue(prop)
        } else {
          // if value is false, the property is not gonna have an animation
          this.target[camelCase(prop)] = this.origin[camelCase(prop)]
        }
      }
    },
    addMorphDiv () {
      // create div element for morphing animation
      let div = document.createElement('div')
      div.setAttribute('id', 'morphing-div')
      div.style.position = 'absolute'

      this.current.el = div
      this.$el.appendChild(this.current.el)
    },
    morph (params, easing, duration, callback) {
      this.state = 'morphing'

      // prepare option for morphing animation
      const animOption = {
        targets: this.current.el,
        left:   [this.origin.absX + 'px', this.target.absX + 'px'],
        top:    [this.origin.absY + 'px', this.target.absY + 'px'],
        width:  [this.origin.w + 'px', this.target.w + 'px'],
        height: [this.origin.h + 'px', this.target.h + 'px'],
        easing: easing,
        duration: duration,
        loop: false
      }

      // set additional parameters if any
      for (let prop in params) {
        let propName = camelCase(prop)
        animOption[propName] = [this.origin[propName], this.target[propName]]
      }

      // animate
      let morphingAnimation = anime(animOption)

      // callback when the animation is done
      morphingAnimation.complete = () => {
        this.state = 'target'
        this.$el.removeChild(this.current.el)
        if (callback) callback()
      }
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#morphing-layer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  z-index: 9999;
}
</style>
