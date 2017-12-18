<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    id="modal-window"
    :style="[getVisibility, getBgColor]"
    v-morph="morphOption"
    >
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'modal',
  props: {
    isVisible: Boolean,
    bgColor: String,
    originElementId: String
  },
  watch: {
    originElementId (val) {
      console.log('origin element id watched', val)
      // this.$forceUpdate()
    }
  },
  data () {
    return {
      morphOption: {
        targetElementId: this.originElementId,
        triggerEventType: 'click',
        params: {
          'background-color': false,
          'border-radius': true
        },
        easing: 'easeOutQuint',
        duration: 500,
        callback: this.morphDone
      }
    }
  },
  computed: {
    getVisibility () {
      return this.isVisible ? {'visibility': 'visible'} : {'visibility': 'hidden'}
    },
    getBgColor () {
      return {'background-color': this.bgColor}
    }
  },
  methods: {
    morphDone () {
      console.log('morph is done!!!')
      // this.$emit('morph-done', {appButtonBgColor: this.bgColor})
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
#modal-window {
  position: fixed;
  width: 90%;
  height: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
</style>
