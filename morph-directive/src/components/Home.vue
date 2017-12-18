<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <ul>
      <app-button
        v-for="n in appButtonNum"
        :key="n"
        :bg-color="getBgColor(n)"
        :morph-option="morphOption"
      />
    </ul>
    <!-- <div id="origin-box" v-morph="morphOption" @click="clicked($event)">
    </div>
    <div id="target-box">
    </div> -->
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import AppButton from '@/components/AppButton'

export default {
  name: 'home',
  components: {
    AppButton
  },
  data () {
    return {
      appButtonNum: 12,
      morphOption: {
        targetElementId: 'app',
        triggerEventType: 'morph',
        params: {
          'background-color': false,
          'border-radius': true
        },
        easing: 'easeOutQuint',
        duration: 1000,
        callback: this.morphDone
      }
    }
  },
  methods: {
    clicked (e) {
      // trigger the morphing event
      e.toElement.dispatchEvent(new Event('morph'))
    },
    morphDone () {
      console.log('morph is done!!!')
    },
    getBgColor (n) {
      let h = (360 / this.appButtonNum) * n
      let s = 80
      let l = 70
      let a = 1.0
      return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
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
  border-radius: 20px;
}

#target-box {
  position: absolute;
  top: 450px;
  left: 500px;
  width: 300px;
  height: 200px;
  background-color: tomato;
}
</style>
