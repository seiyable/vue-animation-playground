<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <div id="origin-box" v-morph="morphOption" @click="clicked($event)">
    </div>
    <div id="target-box">
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'home',
  data () {
    return {
      morphOption: {
        targetElementId: 'target-box',
        triggerEventType: 'morph',
        params: [
          'backgroundColor', 'borderRadius'
        ],
        easing: 'easeOutQuint',
        duration: 1000,
        callback: function () {
          console.log('morph is done!!')
        }
      }
    }
  },
  methods: {
    clicked (e) {
      // trigger the morphing event
      e.toElement.dispatchEvent(new Event('morph'))
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.page-wrapper {
  height: 100%;
}

#origin-box {
  position: absolute;
  top: 100px;
  left: 200px;
  width: 400px;
  height: 300px;
  background-color: seagreen;
}

#target-box {
  position: absolute;
  top: 600px;
  left: 500px;
  width: 500px;
  height: 200px;
  background-color: tomato;
}
</style>
