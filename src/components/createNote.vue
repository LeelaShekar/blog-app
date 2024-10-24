<template>
  <div class="width-20">
    <div class="createnote-block mb-4">
      <p class="mr-2">You can create your own Note App</p>
      <div>
        <v-btn @click="openNoteDialog">Click here</v-btn>
      </div>
    </div>
  </div>
  <createNotePopup
    :noteDialog="props.noteDialog"
    @closeNoteDialog="closeNoteDialog"
    @addFiles="addFiles"
    @uploadImage="uploadImage"
    :noteTitle="noteTitle"
    :noteDesc="noteDesc"
    :isEditContent="props.isEditContent"
    @addNote="addNote"
    @saveNote="saveNote"
    :notes="props.notes"
    :imageSrc="props.imageSrc"
    @createImagePreview="createImagePreview"
     :getNoteTitle="props.getNoteTitle"
        :getDescTitle="props.getDescTitle"
  />
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import createNotePopup from "./createNotePopup.vue";

const emit = defineEmits(["addNote", "saveNote", "updateImageSrc", "openNoteDialog", "closeNoteDialog"]);

const props = defineProps({
  getNoteTitle: String,
  getDescTitle: String,
  isEditContent: Boolean,
  imageSrc: String,
  notes: Array,
  noteDialog: Boolean
});
 




const noteTitle = ref(props.getNoteTitle);
const noteDesc = ref(props.getDescTitle);

const addNote = (title, desc, image) => {
  emit("addNote", title, desc, image);
};

const saveNote = (title, desc, image) => {
  emit("saveNote", title, desc, image);
};

const uploadImage = () => {
  document.getElementById("upload-file-input").click();
};

const addFiles = (e) => {
  console.log(e, "addFiles");
  let file = e.target.files[0];
  if (file) {
    createImagePreview(file);
  }
};

const openNoteDialog = () => {
  emit('openNoteDialog')
};

const closeNoteDialog = () => {
  emit("closeNoteDialog")
};

// Create a preview of the image using a FileReader
const createImagePreview = (file) => {
  console.log(file, "createImagePreview");
  const reader = new FileReader();
  reader.onload = (e) => {
    console.log(e, "updateimagesrc");
    emit("updateImageSrc", e);
  };
  reader.readAsDataURL(file); // Convert the file to a base64 data URL
};
</script>

<style>
.width-20 {
  width: 100%;
}
.createnote-block {
  padding: 0 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.createnote-block > div {
  padding: 5px 0;
}
.createnote-block input,
.createnote-block textarea {
  width: 100%;
}

.createnote-block button {
  letter-spacing: 0;
  text-transform: capitalize;
  background: #083e69;
  color: #fff;
}
.createnote-block input,
.createnote-block textarea {
  border: 0;

  border-radius: 4px;
  padding: 5px 0;
}
.createnote-block input {
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
.preview-img {
  width: 150px;
  /* height: 100px; */
  display: inline-block;
}

.show-image {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  object-position: center;
}

.add-btn {
  background: #000;
  color: #fff;
}
</style>
