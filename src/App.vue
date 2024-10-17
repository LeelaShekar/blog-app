<template> 
  <noteWrapper  />
</template>

<script>
import noteWrapper from './components/noteWrapper.vue'

export default {
  name: 'App',
  components: {
    noteWrapper
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}
</style>
