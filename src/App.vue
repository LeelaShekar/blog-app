<template>  
<div :class="route.name">
<h1 v-if="userName">Welcome {{userName}}!</h1>
  <router-view></router-view>
</div>
</template>

<script setup> 

import { watch,ref } from 'vue';
import { noteAppStore } from '@/main';

import { useRoute } from 'vue-router';

const store =    noteAppStore()

const route = useRoute(); 

const userName = ref('')

watch(
  () => store.$state.loginDetails,
  () => {
    userName.value= store.$state.loginDetails?.email ? store.$state.loginDetails.email.split('@')[0] : '';
  }
);


 
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

 

h1{
  background: #f6f6f6;
    padding: 10px 0;
    border-bottom: 1px solid #e6e6e6;
}

 
</style>
