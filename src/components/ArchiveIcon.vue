<template>
  <div class="color-palette">
    <md-icon @click.native="sendToArchive">archive</md-icon>
  </div>
</template>

<script>
import NoteService from '../services/NoteService'
import { eventBus } from "../main";
export default {
  name: "ArchiveIcon",
  props:["note"],
  methods:{
    sendToArchive:function(){
      const archiveData={
        isArchived:true,
        noteIdList:[this.note]
      }
      NoteService.archiveNotes(archiveData).then(()=>{
        eventBus.$emit("getUpdatedNoteList");
      })
    }
  }
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
  margin-left: 5px;
}
</style>