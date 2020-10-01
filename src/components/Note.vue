<template>
  <div>
    <CreateNote />
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
    };
  },
  components: {
    CreateNote,
    DisplayNote,
  },
  methods: {
    fetchNotes: function () {
      NoteService.fetchNotesList().then((response) => {
        response.data.data.data.forEach((element) => {
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
</style>