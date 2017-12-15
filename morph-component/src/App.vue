<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from './components/Home'
require('reset-css')
require('vue2-animate/dist/vue2-animate.min.css')

export default {
  name: 'app',
  components: {
    Home
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
