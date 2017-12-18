<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div
    class="app-button"
    :style="[getBgColor]"
    v-morph="morphOption"
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
    bgColor: String,
    morphOption: Object
  },
  computed: {
    getBgColor () {
      return {'background-color': this.bgColor}
    }
  },
  methods: {
    clicked (e) {
      // trigger the morphing event
      e.toElement.dispatchEvent(new Event('morph'))
    },
    morphDone () {
      console.log('morph is done!!!')
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
