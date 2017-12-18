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
        :id="'app-button-' + n"
        @morph-done="morphDone"
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
      appButtonNum: 12
    }
  },
  methods: {
    getBgColor (n) {
      let h = (360 / this.appButtonNum) * n
      let s = 80
      let l = 70
      let a = 1.0
      return 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + a + ')'
    },
    morphDone (payload) {
      this.$emit('morph-done', payload)
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
