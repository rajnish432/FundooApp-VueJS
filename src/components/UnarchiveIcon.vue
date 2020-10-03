<template>
  <div class="color-palette">
    <md-icon @click.native="unarchiveNotes">unarchive</md-icon>
  </div>
</template>

<script>
import NoteService from '../services/NoteService'
import {eventBus} from '../main'
export default {
  name: "UnarchiveIcon",
  props:["noteId"],
  methods: {
    unarchiveNotes: function () {
      const noteData = {
        isArchived: false,
        noteIdList: [this.noteId],
      };
      NoteService.unarchiveNotes(noteData).then(() => {
        eventBus.$emit("unarchivedNote");
      });
    },
  },
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
}
</style>