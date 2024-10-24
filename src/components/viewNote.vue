<template>
    <v-container>
        <img v-if="getNoteDetails.image" :src="getNoteDetails.image" />
        <img v-else class="" src="../../public/assets/images/no-image.png" />
        <div class="text-left">
            <p>Status: {{getNoteDetails.status}}</p>
        <h2>{{getNoteDetails.title}}</h2>
        <p>{{getNoteDetails.description}}</p>
       
    </div>
        
    </v-container>
</template>


<script setup>
import { noteAppStore } from '@/main';
import { computed, onMounted } from 'vue';

const store =    noteAppStore()

 
const getNoteDetails = computed(()=> store.$state.noteDetails)

onMounted(()=>{
    console.log( store)
})
</script>

<style>
.viewNote{
    background: #9ec5e442;
}
.viewNote img{
    max-width: 400px;
}

</style>