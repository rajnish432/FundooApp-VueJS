<template>
  <div class="color-palette" @click="sendToTrash">
    <md-icon>delete</md-icon>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "DeleteIcon",
  data() {
    return {
      cartId: [],
      noteList: [],
    };
  },
  methods: {
    sendToTrash: function () {
      const trashData = {
        isDeleted: true,
        noteIdList: [this.cartId],
      };
      NoteService.moveToTrash(trashData).then(() => {
        eventBus.$emit("getUpdatedNoteList");
      });
    },
  },
  created() {
    eventBus.$on("getNoteId", (data) => {
      this.cartId = data;
    });
  },
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
}
</style>