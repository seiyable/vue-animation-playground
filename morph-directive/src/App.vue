<template>
  <div id="app">
    <morphing-layer ref="morphing-layer" />
    <modal-window
      :is-visible="isModalVisible"
      :bg-color="modalBgColor"
      :origin-element-id="originElementId"
    />
    <home
      @morph-done="showModal"
    />
  </div>
</template>

<script>
import MorphingLayer from '@/components/MorphingLayer'
import ModalWindow from '@/components/ModalWindow'
import Home from '@/components/Home'
require('reset-css')

export default {
  name: 'app',
  components: {
    Home, MorphingLayer, ModalWindow
  },
  data () {
    return {
      isModalVisible: false,
      modalBgColor: '',
      originElementId: ''
    }
  },
  methods: {
    showModal (payload) {
      this.modalBgColor = payload.appButtonBgColor
      this.originElementId = payload.originElementId
      this.isModalVisible = true
    }
  }
}
</script>

<style>
html, body, #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  height: 100%;
  background-color: snow;
}
</style>
