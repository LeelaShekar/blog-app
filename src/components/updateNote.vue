<template>
    <div class="width-80" >
        
    <div class="white-bg" v-for="(note,i) in props.notes" :key="i">
        <div class="d-flex d-end">
        
        <div class="edit" @click="editContent(note)" title="Edit">Edit</div> 
        <div class="close" @click="deleteContent(i)" title="Delete">X</div>
    </div>
         
        <img :src="note.image" />
       <h3> {{ note.title }}</h3>
       <p class="desc"> {{ note.description }}</p>
        <div class="d-flex d-space-btwn">
            <div class="icons" v-if="note.status === 'in-progress'">
                <p class="badge completed" @click="updateStatus('completed', note)">completed</p>
                <p class="badge rejected" @click="updateStatus('rejected', note)">Rejected</p>
            </div>
            <p class="badge" :class="note.status">{{note.status}}</p>
        </div>
       
    </div>
    </div>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
    
    notes: Array,
})



const emit = defineEmits(['deleteNote', 'editContent', 'updateStatus']);

 
const deleteContent = (i) =>{
     emit('deleteNote',i)
}

const editContent = (item) =>{ 
    emit('editContent',item)
}

const updateStatus = (status, note) =>{
    emit('updateStatus', status, note)
}
</script>

<style>
.width-80{
    width: 80%;
    display: flex;
    flex-wrap: wrap;
    min-height: 220px;
}
.white-bg{
    background-color: #fff;
    width: 30%;
    display: inline-block;
    margin: 10px;
    position: relative;
    border-radius: 8px;
    padding: 10px;
    border: 1px solid #d2d2d2;
}
.white-bg h3,.white-bg .desc{
    text-align: left;
}
.close {
   
  
    font-size: 14px;
    cursor: pointer;
    padding: 5px;
}
.edit{
     
    text-decoration: underline;
    font-size: 14px;
    cursor: pointer;
    padding: 5px;

}



.badge {
    background: lightblue;
    display: inline;
    padding: 2px 10px;
    border-radius: 4px; 
    bottom: 10px;
    right: 10px;
    margin: 2px;
    font-size: 12px;
    cursor: pointer;
}

.badge.rejected{
    background-color: red;
    color: #fff;
}

.badge.completed{
    background-color: green;
    color: #fff;
}



.d-flex{
    display: flex;
    align-items: center;
}
.d-end{
    justify-content: end;
}
.d-space-btwn{
    justify-content: space-between;
}
</style>