<!-- =================================================
 Vue Template
================================================== -->
<template>
  <!-- <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    v-show="state === 'morphing'"
    :viewbox="getSvgViewbox"
    :width="svgWidth"
    :height="svgHeight"
    id="morphing-layer"
  >
  </svg> -->
  <div v-show="state === 'morphing'" id="morphing-layer">
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import anime from 'animejs'

export default {
  name: 'morphing-layer',
  data () {
    return {
      state: 'origin', // 'origin' or 'morphing' or 'target'
      svgWidth: 0,
      svgHeight: 0,
      origin: {
        el: null, absX: 0, absY: 0, w: 0, h: 0 // , fill: ''
      },
      target: {
        el: null, absX: 0, absY: 0, w: 0, h: 0 // , fill: ''
      },
      current: {
        el: null, absX: 0, absY: 0, w: 0, h: 0 // , fill: ''
      }
    }
  },
  created () {
    this.initData()
  },
  // created () {
  //   this.updateSvgSize()
  //   window.addEventListener('resize', this.updateSvgSize)
  // },
  // beforeDestroy () {
  //   window.removeEventListener('resize', this.updateSvgSize)
  // },
  // computed: {
  //   getSvgViewbox () {
  //     return '0 0 ' + this.svgHeight + ' ' + this.svgHeight
  //   }
  // },
  methods: {
    // updateSvgSize () {
    //   this.svgWidth = window.innerWidth
    //   this.svgHeight = window.innerHeight
    // },
    startMorphing ({originElement, targetElementId, params, easing, duration, callback}) {
      console.log('in morphing layer...')
      this.initData()
      this.prepareData(originElement, targetElementId, params)
      // this.addSvgPaths()
      this.addMorphDiv()
      this.morph(easing, duration, callback)
    },
    initData () {
      this.origin = {
        el: null, absX: 0, absY: 0, w: 0, h: 0, backgroundColor: ''
      }
      this.target = {
        el: null, absX: 0, absY: 0, w: 0, h: 0, backgroundColor: ''
      }
      this.current = {
        el: null, absX: 0, absY: 0, w: 0, h: 0, backgroundColor: ''
      }
    },
    prepareData (originElement, targetElementId, params) {
      this.origin.el = originElement
      this.target.el = document.getElementById(targetElementId)

      let originBcr = this.origin.el.getBoundingClientRect()
      this.origin.absX = originBcr.left + window.pageXOffset
      this.origin.absY = originBcr.top + window.pageYOffset
      this.origin.w = this.origin.el.offsetWidth
      this.origin.h = this.origin.el.offsetHeight
      // this.origin.fill = 'seagreen'

      let targetBcr = this.target.el.getBoundingClientRect()
      this.target.absX = targetBcr.left + window.pageXOffset
      this.target.absY = targetBcr.top + window.pageYOffset
      this.target.w = this.target.el.offsetWidth
      this.target.h = this.target.el.offsetHeight
      // this.target.fill = 'tomato'

      let originComputedStyle = window.getComputedStyle(this.origin.el)
      console.log(originComputedStyle)
      let targetComputedStyle = window.getComputedStyle(this.target.el)
      for (let i = 0; i < params.length; i++) {
        let propName = params[i]
        this.origin[propName] = originComputedStyle.getPropertyValue(propName)
        this.target[propName] = targetComputedStyle.getPropertyValue(propName)
      }

      console.log(this.origin['backgroundColor'])
    },
    // addSvgPaths () {
    //   const xmlns = 'http://www.w3.org/2000/svg'
    //   let rect = document.createElementNS(xmlns, 'rect')
    //   rect.setAttributeNS(null, 'x', this.origin.absX)
    //   rect.setAttributeNS(null, 'y', this.origin.absX)
    //   rect.setAttributeNS(null, 'width', this.origin.w)
    //   rect.setAttributeNS(null, 'height', this.origin.h)
    //   rect.setAttributeNS(null, 'id', 'morph-rect')
    //   rect.style.fill = this.origin.fill
    //
    //   this.current.el = rect
    //   this.$el.appendChild(this.current.el)
    // },
    addMorphDiv () {
      let div = document.createElement('div')
      div.style.left = this.origin.absX
      div.style.top = this.origin.absY
      div.style.width = this.origin.w
      div.style.height = this.origin.h

      this.current.el = div
      this.$el.appendChild(this.current.el)
    },
    morph (easing, duration, callback) {
      this.state = 'morphing'

      // let morphingAnimation = anime({
      //   targets: this.current.el,
      //   x: [this.origin.absX, this.target.absX],
      //   y: [this.origin.absY, this.target.absY],
      //   width: [this.origin.w, this.target.w],
      //   height: [this.origin.h, this.target.h],
      //   easing: easing,
      //   duration: duration,
      //   loop: false
      // })

      let morphingAnimation = anime({
        targets: this.current.el,
        left: [this.origin.absX, this.target.absX],
        top: [this.origin.absY, this.target.absY],
        width: [this.origin.w, this.target.w],
        height: [this.origin.h, this.target.h],
        backgroundColor: [this.origin.backgroundColor, this.target.backgroundColor],
        easing: easing,
        duration: duration,
        loop: false
      })

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
svg {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  z-index: 9999;
}

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
