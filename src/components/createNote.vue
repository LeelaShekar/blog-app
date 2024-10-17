<template>
    <div class="width-20">
      <div class="createnote-block">
        <img 
        v-if="imageSrc"
          :src="imageSrc" 
          :style="{ maxWidth: '100%', maxHeight: '100%' }" 
          class="my-5" 
          alt="Uploaded Image" 
        />
        
        <div >
          <input
            id="upload-file-input"
            ref="file"
            class="input-file"
            aria-label="file upload"
            type="file"  
            @change="addFiles($event)"
          />
          <button class="upload-btn" @click="uploadImage()">Image upload</button>
        </div>
  
        <div>
          <input placeholder="Title" v-model="noteTitle" />
        </div>
        
        <div>
          <textarea 
            placeholder="Description" 
            v-model="noteDesc" 
            rows="3">
          </textarea>
        </div>
  
        <div>
          <button v-if="!watchEditContent" class="add-btn" @click="addNote()">Add Note</button>
          <div v-else>
            <button @click="saveNote()">Save Note</button>
            <button @click="cancelNote()">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  

<script setup> 

 
import { ref,defineEmits ,defineProps, watch} from 'vue';

const emit = defineEmits(['addNote', 'saveNote', 'updateImageSrc']);

const props = defineProps({
    getNoteTitle:String,
    getDescTitle:String, 
    isEditContent: Boolean, 
    imageSrc: String

})

const watchEditContent = ref(false); 

watch (
    () => props.getNoteTitle,
    () => { 
       noteTitle.value = props.getNoteTitle 
    }
    
)

watch (
    () => props.getDescTitle,
    () => {  
         
       noteDesc.value = props.getDescTitle
    }
    
)

watch (
    () => props.isEditContent,
    () => {  
        
        watchEditContent.value = props.isEditContent
    }
    
)
 

const noteTitle = ref(props.getNoteTitle)
const noteDesc = ref(props.getDescTitle)
 

const addNote = () =>{
    emit('addNote', noteTitle.value, noteDesc.value, props.imageSrc) 
    noteTitle.value = '';
    noteDesc.value= '';
};

const saveNote = () =>{
    emit('saveNote', noteTitle.value, noteDesc.value,props.imageSrc) 
}

const uploadImage = () => {
document.getElementById('upload-file-input').click();
}

const  selectedFile = ref(null)


const addFiles = (e) =>{
    
    let file = e.target.files[0]
    if (file) {
       selectedFile.value = file;
        createImagePreview(file);
      }

      
} 

// Create a preview of the image using a FileReader
const createImagePreview = (file) =>{
      const reader = new FileReader();
      reader.onload = (e) => { 
         emit('updateImageSrc', e)
      };
      reader.readAsDataURL(file); // Convert the file to a base64 data URL
    }
</script>

<style>
.width-20{
   width: 20%; 
}
.createnote-block{
    padding: 0 20px;
    position: relative;
}
.createnote-block > div{
    padding: 5px 0;
}
.createnote-block input, .createnote-block textarea, .createnote-block button{
    width: 100%;
}
.createnote-block input, .createnote-block textarea{
    border: 0;
   
    border-radius: 4px;
    padding: 5px 0;
}
.createnote-block input{
    height: 30px;
}
.input-file {
  opacity: 0;
  left: 0;
  top: 40px;
  width: 100%;
  position: absolute;
  cursor: pointer;
  z-index: -1;
}
.img {
    width: 100px;
    height: 100px;
    display: inline-block;
}

img{
    width: 100%;
    max-height: 200px;
}

button {
    border: 0;
    border-radius: 4px;
    padding: 10px 10px;
}
.upload-btn{
    background: #2d8494;
  
    color: #fff;
}

.add-btn{
    background: grey;
    color: #fff;
}
</style>