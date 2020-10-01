<template>
  <div class="color-palette">
    <md-icon @click.native="restoreFromTrash">restore_from_trash</md-icon>
  </div>
</template>
<script>
import NoteService from "../services/NoteService";
import { eventBus } from "../main";
export default {
  name: "RestoreTrashIcon",
  props:["noteId"],
  methods: {
    restoreFromTrash: function () {
      const noteData = {
        isDeleted: false,
        noteIdList: [this.noteId],
      };
      NoteService.restoreTrashNotes(noteData).then(() => {
        eventBus.$emit("restoreTrashList");
      });
    },
  },
};
</script>>
<style scoped>
.color-palette {
  cursor: pointer;
}
</style>