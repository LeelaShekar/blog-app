<template>
    <div>
        <h1>Note App</h1>
    
    <div class="note-wrap"> 
       
        <createNote   @addNote="addNote"  :getNoteTitle="getNoteTitle" :getDescTitle="getDescTitle" :isEditContent="isEditContent" :getImage="getImage" 
        @updateImageSrc="updateImageSrc"
        @saveNote="saveNote" :imageSrc="imageSrc" />
        <UpdateNote :getNoteTitle="getNoteTitle" :notes="notes"  :getDescTitle="getDescTitle" 
        @updateStatus="updateStatus"
        @deleteNote="deleteNote" @editContent="editContent" />
    </div>
</div>
</template>

<script setup> 
import createNote from './createNote.vue'
import UpdateNote from './updateNote.vue';

import {ref} from 'vue';
 
 const getNoteTitle = ref('')
 const getDescTitle = ref('')
 const getNoteId = ref(null)
 const getImage = ref(null); 

 const imageSrc = ref('')

 const notes = ref([]);  

const addNote = (title,desc, image) =>{ 
    getNoteTitle.value = title
    getDescTitle.value = desc 
    getImage.value = image 

    const newNote = {
        id: notes.value.length ?notes.value[notes.value.length - 1].id + 1 : 1, 
        title: title,
        description: desc,
        image: image,
        status: 'in-progress'
    }; 
    notes.value.push(newNote) 
    console.log(notes.value)
    getNoteTitle.value = '';
    getDescTitle.value  = '';
    getImage.value = null;
    imageSrc.value = null;
     
}


const deleteNote = (note) => {  
    notes.value.splice(note, 1); 
}

const isEditContent = ref(false)

const editContent = (item) =>{  
    isEditContent.value = true;
    getDescTitle.value = item.description
    getNoteTitle.value = item.title 
    getNoteId.value = item.id 
    imageSrc.value = item.image
}

const saveNote = (title, desc , img) => { 
    for(let x of notes.value){ 
       
        if(x.id == getNoteId.value){
            x.title = title;
            x.description = desc
            x.image = img
            break;
        } 
    }
    isEditContent.value = false;
    getNoteTitle.value = '';
    getDescTitle.value  = ''
    getNoteId.value = null;
}

const updateImageSrc = (e) =>{
    imageSrc.value = e.target.result
}
 
 const updateStatus = (status, note) =>{
    
    const findUser = notes.value.find(item => item.id === note.id)
    
    findUser.status = status
        
 }
</script>

<style>
.note-wrap{
    display: flex;
    align-items: flex-start ;
    height: 100vh;
    background: #e7e7e7;
    padding: 20PX 0;

}
</style>