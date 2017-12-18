<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="app-button"
    :style="[getBgColor]"
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
  name: 'app-button',
  props: {
    bgColor: String
  },
  computed: {
    getBgColor () {
      return {'background-color': this.bgColor}
    },
    getMorphOption () {
      return {
        targetElementId: 'modal-window',
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
      // trigger the morphing event
      e.toElement.dispatchEvent(new CustomEvent('morph', {'detail': this.getMorphOption}))
    },
    morphDone () {
      console.log('morph is done!!!')
      this.$emit('morph-done', {
        appButtonBgColor: this.bgColor,
        originElementId: this.$el.id
      })
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.app-button {
  width: 200px;
  height: 200px;
  margin: 10px;
  border-radius: 20px;
  float: left;
}
</style>
