<template>
  <v-container fluid v-if="props.notes.length">
    <v-row>
      <v-col
        class="white-bg"
        v-for="(note, i) in props.notes"
        :key="i"
        sm="12"
        lg="3"
        md="3"
        @click="openViewNote(note)"
      >
        <div class="d-flex d-end actions pt-1 pr-3">
          <div class="edit" @click.stop="editContent(note)" title="Edit">
            <v-icon size="20" >mdi-pencil-outline </v-icon>
          
          </div>
          <div class="close" @click.stop="deleteContent(i)" title="Delete">
            <v-icon size="20" >mdi-delete-outline </v-icon>
          </div>
          <v-menu>
              <template v-slot:activator="{ props }">
                <v-icon size="20" v-bind="props">mdi-dots-vertical </v-icon>
              </template>
              <v-list>
                <v-list-item  @click="updateStatus('completed', note)"
                >
                  <v-list-item-title>Completed</v-list-item-title>
                </v-list-item>
                <v-list-item   @click="updateStatus('rejected', note)"
                >
                  <v-list-item-title>Rejected</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
        </div>

        <img v-if="note.image" class="show-image" :src="note.image" />
        <img v-else class="show-image" src="../../public/assets/images/no-image.png" />
        <div class="px-4">
        <h3 class="mb-0">{{ note.title }}</h3>
        <p class="desc">{{ note.description }}</p>
        <div class="d-flex d-space-btwn status-block"> 
          <div class="update-status">
            <p class="badge" :class="note.status">{{ note.status }}</p>
            
           
          </div>
        </div>
    </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { noteAppStore } from '@/main';
import { useRouter } from 'vue-router';

const store =    noteAppStore()

const route = useRouter();

const props = defineProps({
  notes: Array,
});

const emit = defineEmits(["deleteNote", "editContent", "updateStatus"]);

const deleteContent = (i) => {
  emit("deleteNote", i);
};

const editContent = (item) => {
  emit("editContent", item);
};

const updateStatus = (status, note) => {
  emit("updateStatus", status, note);
};

const openViewNote = (item) => {
    store.updateNoteDetails(item);
    route.push('/view')

}
</script>

<style>
.width-80 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 220px;
}
.white-bg {
  background-color: #f6f6f6; 
  display: inline-block;
  margin: 10px;
  position: relative;
  border-radius: 8px;
  padding: 0px;
  border: 1px solid #083e69;
  overflow: hidden;
  padding-bottom: 20px;
  cursor: pointer;
}

.white-bg h3,
.white-bg .desc {
  text-align: left;
  margin: 0 0 10px 0;

  color: #083e69;
}
.close {
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
}
.edit {
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  padding: 5px;
}

.badge { 
  display: inline;
  padding: 2px 10px;
  border-radius: 4px;
  margin: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-right: 0;
  color: #fff;
  text-transform: capitalize
}

.badge.rejected {
  background-color: #d01919;
  color: #fff;
}

.badge.in-progress{
    background: #2c79b6;
}

.badge.completed {
  background-color: green;
  color: #fff;
}

.d-flex {
  display: flex;
  align-items: center;
}
.d-end {
  justify-content: end;
}
.d-space-btwn {
  justify-content: space-between;
}
.status-block {
  position: absolute;
  width: 100%;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 10px;
}

.icons {
  margin-left: 10px;
  text-align: left;
  width: 50%;
}
.update-status {
  width: 100%;
  text-align: right;
  margin-right: 15px;
}
.actions{
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
    opacity: 0;
}
.white-bg:hover{
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
   
}
.white-bg:hover  .actions{
    opacity: 1;
    }
</style>
