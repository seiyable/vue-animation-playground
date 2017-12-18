<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    id="modal-window"
    :style="[getVisibility, getBgColor]"
    v-morph
    @click="clicked($event)"
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
  computed: {
    getVisibility () {
      return this.isVisible ? {'visibility': 'visible'} : {'visibility': 'hidden'}
    },
    getBgColor () {
      return {'background-color': this.bgColor}
    },
    getMorphOption () {
      return {
        targetElementId: this.originElementId,
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
  methods: {
    clicked (e) {
      this.$emit('close-modal')
      // trigger the morphing event
      e.toElement.dispatchEvent(new CustomEvent('morph', {'detail': this.getMorphOption}))
    },
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
