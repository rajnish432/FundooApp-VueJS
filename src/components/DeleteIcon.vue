<template>
<div>
  <div class="color-palette" @click="sendToTrash()">
    <md-icon>delete</md-icon>
  </div>
  <md-snackbar
      md-position="left"
      :md-duration="isInfinity ? Infinity : duration"
      :md-active.sync="showSnackbar"
      md-persistent
    >
      <span>{{ result }}</span>
    </md-snackbar>
</div>
</template>

<script>
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "DeleteIcon",
  props: ["note"],
  data() {
    return {
      showSnackbar: false,
      result:"",
    };
  },
  methods: {
    sendToTrash: function () {
      const trashData = {
        isDeleted: true,
        noteIdList: [this.note],
      };
      NoteService.moveToTrash(trashData).then(() => {
        this.showSnackbar = true;
        this.result = "Moved to Trash";
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