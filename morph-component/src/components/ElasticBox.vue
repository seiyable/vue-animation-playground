<!-- =================================================
 Vue Template
================================================== -->
<template>
  <svg
    :viewbox="getSvgViewbox"
    :width="getSvgWidth"
    :height="getSvgHeight"
    :style="getSvgPos"
    @click="clicked()" >

    <rect
      :x="current.x"
      :y="current.y"
      :width="current.w"
      :height="current.h"
      :style="{fill: current.fill}">
    </rect>

  </svg>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import anime from 'animejs'

export default {
  name: 'app',
  props: {
    initialWidth: Number,
    initialHeight: Number,
    initialFill: String,
    targetElementId: String
  },
  data () {
    return {
      state: 'original', // 'original' or 'morphing' or 'target'
      original: {
        parent: null, absX: 0, absY: 0, w: 0, h: 0, fill: ''
      },
      target: {
        el: null, absX: 0, absY: 0, w: 0, h: 0, fill: ''
      },
      current: {
        x: 0, y: 0, w: 0, h: 0, fill: ''
      }
    }
  },
  created () {
    // initialize parameters
    this.original.w = this.initialWidth
    this.original.h = this.initialHeight
    this.original.fill = this.initialFill
    this.current.w = this.original.w
    this.current.h = this.original.h
    this.current.fill = this.original.fill
  },
  mounted () {
    // initialize parameters
    this.original.parent = this.$el.parent
    this.target.el = document.getElementById(this.targetElementId)
    this.target.w = this.target.el.offsetWidth
    this.target.h = this.target.el.offsetHeight
  },
  computed: {
    /* return svg-element's viewbox in String */
    getSvgViewbox () {
      return '0 0 ' + this.getSvgWidth + ' ' + this.getSvgHeight
    },
    /* return svg-element's width in Number */
    getSvgWidth () {
      switch (this.state) {
        case 'original':
          return this.original.w
        case 'morphing':
          return window.innerWidth
        case 'target':
          return this.target.w
      }
    },
    /* return svg-element's height in Number */
    getSvgHeight () {
      switch (this.state) {
        case 'original':
          return this.original.w
        case 'morphing':
          return window.innerHeight
        case 'target':
          return this.target.h
      }
    },
    /* return svg-element's position in Object */
    getSvgPos () {
      switch (this.state) {
        case 'original':
        case 'target':
          return { position: 'static', left: 'auto', top: 'auto' }
        case 'morphing':
          return { position: 'absolute', left: 0, top: 0 }
      }
    }
  },
  methods: {
    /*
      when clicked on this svg element,
      if is's not in the middle of morphing animation, start morphing
    */
    clicked () {
      if (this.state === 'original') {
        this.resetAbsParams()
        this.switchParentTo(this.$root.$el)
        this.startMorphing({
          from: this.original,
          to: this.target,
          toStateName: 'target'
        }).then(() => {
          this.switchParentTo(this.target.el.parentElement)
        })
      } else if (this.state === 'target') {
      }
    },
    resetAbsParams () {
      // reset original params
      let bcr = this.$el.getBoundingClientRect()
      this.original.absX = bcr.left + window.pageXOffset
      this.original.absY = bcr.top + window.pageYOffset

      // reset target params
      this.target.absX = this.target.el.offsetLeft
      this.target.absY = this.target.el.offsetTop
    },
    switchParentTo (parent) {
      parent.appendChild(this.$el)
    },
    startMorphing ({from, to, toStateName}) {
      return new Promise((resolve) => {
        this.state = 'morphing'
        this.$emit('started-morphing-into-' + toStateName)

        let morph = anime({
          targets: this.$el.getElementsByTagName('rect')[0],
          x: [from.absX, to.absX],
          y: [from.absY, to.absY],
          width: [from.w, to.w],
          height: [from.h, to.h],
          easing: 'easeOutQuint',
          duration: 300,
          loop: false
        })

        // callback when the animation is done
        morph.complete = () => {
          this.state = toStateName
          this.$emit('finished-morphing-into-' + toStateName)
          resolve()
        }
      })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
</style>
