<template>
  <div class="color-palette" @click="sendToTrash()">
    <md-icon>delete</md-icon>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "DeleteIcon",
  props:["note"],
  methods: {
    sendToTrash: function () {
      const trashData = {
        isDeleted: true,
        noteIdList: [this.note],
      };
      NoteService.moveToTrash(trashData).then(() => {
        eventBus.$emit("getUpdatedNoteList");
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