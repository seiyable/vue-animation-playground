<template>
  <div id="app">
    <morphing-layer ref="morphing-layer" />
    <home />
  </div>
</template>

<script>
import MorphingLayer from '@/components/MorphingLayer'
import Home from '@/components/Home'
require('reset-css')

export default {
  name: 'app',
  components: {
    Home, MorphingLayer
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
