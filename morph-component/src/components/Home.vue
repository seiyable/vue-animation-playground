<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <div id="target-box" :style="getBgColor">
    </div>
    <div class="box-wrapper">
      <elastic-box
        :initialWidth="400"
        :initialHeight="300"
        :initialFill="'seagreen'"
        :targetElementId="'target-box'"
        @started-morphing-into-target="morphStarted()"
        @finished-morphing-into-target="morphFinished()"
      />
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
import ElasticBox from '@/components/ElasticBox.vue'

export default {
  name: 'home',
  components: {
    ElasticBox
  },
  data () {
    return {
      morphed: false
    }
  },
  computed: {
    getBgColor () {
      if (!this.morphed) {
        return {'background-color': 'yellow'}
      } else {
        return {'background-color': 'seagreen'}
      }
    }
  },
  methods: {
    morphStarted () {
      console.log('morph started')
    },
    morphFinished () {
      console.log('morph finished')
      this.morphed = true
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

.box-wrapper {
  padding-top: 100px;
  padding-left: 500px;
}

#target-box {
  position: absolute;
  width: 900px;
  height: 400px;
  left: 300px;
  top: 500px;
}
</style>
