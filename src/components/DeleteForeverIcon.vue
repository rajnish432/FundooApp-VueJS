<template>
  <div class="color-palette">
    <md-icon @click.native="deletePermanently">delete_forever</md-icon>
  </div>
</template>
<script>
import NoteService from "../services/NoteService";
import { eventBus } from "../main";
export default {
  name: "DeleteForeverIcon",
  props:["noteId"],
  methods: {
    deletePermanently: function () {
      const data = {
        noteIdList: [this.noteId],
      };
      NoteService.deleteForever(data).then(() => {
        eventBus.$emit("getTrashList");
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