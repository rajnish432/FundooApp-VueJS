<template>
  <div>
    <CreateNote />
     <md-progress-spinner :class="{visibility:!visibility}" md-mode="indeterminate"></md-progress-spinner>
    <DisplayNote v-bind:noteList="noteList" />
  </div>
</template>
<script>
import CreateNote from "./CreateNote";
import DisplayNote from "./DisplayNotes";
import NoteService from "../services/NoteService";
import { eventBus } from "../main";
export default {
  data() {
    return {
      noteList: [],
      visibility:false,
    };
  },
  components: {
    CreateNote,
    DisplayNote,
  },
  methods: {
    fetchNotes: function () {
      this.visibility=true
      NoteService.fetchNotesList().then((response) => {
        response.data.data.data.forEach((element) => {
          this.visibility=false;
          if (element.isDeleted == false && element.isArchived == false) {
            this.noteList.push(element);
          }
        });
      });
    },
    fetchTrashList: function () {
      NoteService.fetchTrashNotesList().then((response) => {
        this.noteList = response.data.data.data;
      });
    },
  },
  created() {
    this.fetchNotes();
    eventBus.$on("getUpdatedNoteList", () => {
      this.noteList = [];
      this.fetchNotes();
    });
    eventBus.$emit("sendIdList",this.noteList.id)
  },
};
</script>
<style scoped>
.md-progress-spinner{
  margin: 10px;
}

.visibility{
  display: none;
}
</style>