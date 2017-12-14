<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div class="page-wrapper">
    <div id="target-box">
    </div>
    <div class="box-wrapper">
      <elastic-box
        :initialWidth="400"
        :initialHeight="300"
        :initialFill="'seagreen'"
        :targetElementId="'target-box'"
        @completed="completed()"
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
  methods: {
    completed () {
      console.log('completed!')
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
  background-color: yellow;
}
</style>
