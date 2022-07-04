<template>
  <div id="app">
  <spot-gins :root="root"></spot-gins>
    <div id="map"></div>
   </div>
</template>

<script>
import SpotGins from './components/spot-gins.vue'
export default {
  name: 'App',
  components: {
    SpotGins
  },
  props: {
    root: {
      type: String,
      default: null
    }
  }
}
</script>

<style>
 body {
   padding: 0;
   margin: 0;
}
html, body {
  height:100%;
  width:100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin:0;
  padding:0;
}
</style>
