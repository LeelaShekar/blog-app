<template>
  
    

    <div class="note-wrap">
      <createNote
        @addNote="addNote"
        :getNoteTitle="getNoteTitle"
        :getDescTitle="getDescTitle"
        :isEditContent="isEditContent"
        :getImage="getImage"
        @updateImageSrc="updateImageSrc"
        @saveNote="saveNote"
        :imageSrc="imageSrc"
        :notes="notes" 
          @openNoteDialog="openNoteDialog"
          :noteDialog="noteDialog"
          @closeNoteDialog="closeNoteDialog"
      />
      <UpdateNote
        :getNoteTitle="getNoteTitle"
        :notes="notes"
        :getDescTitle="getDescTitle"
        @updateStatus="updateStatus"
        @deleteNote="deleteNote"
        @editContent="editContent"
        @openNoteDialog="openNoteDialog" 
      />
    </div> 
</template>

<script setup>


import createNote from "./createNote.vue";
import UpdateNote from "./updateNote.vue";
import { ref } from "vue";



const getNoteTitle = ref("");
const getDescTitle = ref("");
const getNoteId = ref(null);
const getImage = ref(null);

const imageSrc = ref("");

const notes = ref([]);

const addNote = (title, desc, image) => {
  console.log(image)
  getNoteTitle.value = title;
  getDescTitle.value = desc;
  getImage.value = image;

  const newNote = {
    id: notes.value.length ? notes.value[notes.value.length - 1].id + 1 : 1,
    title: title,
    description: desc,
    image: image,
    status: "in-progress",
  };
  notes.value.push(newNote);
  getNoteTitle.value = "";
  getDescTitle.value = "";
  getImage.value = null;
  imageSrc.value = null;
};

const deleteNote = (note) => {
  notes.value.splice(note, 1);
};

const isEditContent = ref(false);

const editContent = (item) => {
  isEditContent.value = true;
  getDescTitle.value = item.description;
  getNoteTitle.value = item.title;
  getNoteId.value = item.id;
  imageSrc.value = item.image;
  openNoteDialog();


};

const saveNote = (title, desc, img) => {
  for (let x of notes.value) {
    if (x.id == getNoteId.value) {
      x.title = title;
      x.description = desc;
      x.image = img;
      break;
    }
  } 
  getNoteTitle.value = "";
  getDescTitle.value = "";
  getNoteId.value = null;
  imageSrc.value= '';
  isEditContent.value = false;
};

const updateImageSrc = (e) => { 
  imageSrc.value = e.target.result;
};

const updateStatus = (status, note) => {
  const findUser = notes.value.find((item) => item.id === note.id); 
  findUser.status = status;
};

const noteDialog = ref(false);

const openNoteDialog = () => {
  noteDialog.value = true;
};

const closeNoteDialog = () => {
  getNoteTitle.value = "";
  getDescTitle.value = "";
  getNoteId.value = null;
  imageSrc.value= '';
  noteDialog.value = false;
  isEditContent.value = false;
};



</script>

<style>
.note-wrap {   
    padding: 20px 0; 
}
.heading-name{
  padding: 10px;
}
</style>
