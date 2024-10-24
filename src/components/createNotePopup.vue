<template>
  <v-dialog :model-value="props.noteDialog" max-width="500"  persistent>
    <v-card>
      <v-card-title>Create Note</v-card-title>
      <v-card-text>
        <div class="preview-image">
      <img
          v-if="props.imageSrc"
        :src="props.imageSrc"
        :style="{ maxWidth: '100%', maxHeight: '100%' }"
        class="mb-3 preview-img"
        alt="Uploaded Image"
      />
    </div>
        <div class="note-inputs">

          <div class="mb-3">
        <input
          id="upload-file-input"
          ref="file"
          class="input-file"
          aria-label="file upload"
          type="file"
          @change="addFiles($event)"
        />
        <v-btn class="upload-btn" size="small" @click="uploadImage()">Image upload</v-btn>
      </div>
      <div class="mb-3">
        <v-text-field
      v-model="noteTitle"
      placeholder="Enter your title"
       :rules=titleRule 
       maxlength="50"
    ></v-text-field>
      </div>
      <div class="mb-3">

<v-textarea
v-model="noteDesc"
placeholder="Enter your description"
rows="5"
hide-details
auto-grow
:rules="descriptionRule"
maxlength="500"
></v-textarea>
</div> 
        </div>
      </v-card-text>
      <v-card-actions class="actions-block px-6">
        <v-spacer></v-spacer>
        <div>
        <div v-if="!props.isEditContent" >
        <v-btn class="add-btn" @click="addNote()">
          Add Note
        </v-btn>
        
      </div>
        <div v-else>
          <v-btn @click="saveNote()" class="add-btn">Save Note</v-btn>
          <v-btn @click="cancelNote()" class="cancel-btn">Cancel</v-btn>
        </div>
      </div> 
        
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps,defineEmits,watch } from 'vue';

// Define props
const props = defineProps({
  noteDialog: Boolean, 
  isEditContent: Boolean,
  imageSrc: String,
  getNoteTitle: String,
  getDescTitle: String,
  notes: Array


});

const noteTitle = ref('')
const noteDesc = ref('')  
 
const emit = defineEmits(['closeNoteDialog', 'addFiles','uploadImage','addNote', 'saveNote']);

watch(
  () => props.getNoteTitle,
  () => {
    noteTitle.value = props.getNoteTitle;
  }
);

watch(
  () => props.getDescTitle,
  () => {
    noteDesc.value = props.getDescTitle;
  }
);

 const titleRule = [
 (v) => v && v.length <= 50  || 'Title must be 50 characters or less.',
 ]
 
 const descriptionRule = [
 (v) => v && v.length <= 500  || 'Description must be 500 characters or less.',
 ]

const addFiles = (image) =>{
  emit('addFiles', image)  
}

 

const uploadImage = () =>{
  emit('uploadImage')
}
 
 const addNote = () =>{ 
  if(noteTitle.value){
  emit("addNote", noteTitle.value, noteDesc.value, props.imageSrc);
  noteTitle.value = "";
  noteDesc.value = "";
  emit('closeNoteDialog')
}
 }

 const saveNote = () =>{
  emit('saveNote',noteTitle.value, noteDesc.value, props.imageSrc);
  emit('closeNoteDialog')
 }

 const cancelNote = () =>{
  noteTitle.value = '';
  noteDesc.value = ''; 
  emit('closeNoteDialog')
 }
 
</script>

<style>
 
 .note-inputs button, .actions-block button{
  letter-spacing: 0;
    text-transform: capitalize; 
    color: #fff;
}

 .upload-btn {
  background: #2d8494;
 
  color: #fff;
}

.cancel-btn{
  background-color: grey
}
</style>

