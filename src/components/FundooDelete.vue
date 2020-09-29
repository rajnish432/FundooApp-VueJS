<template>
  <div class="color-palette" @click="sendToTrash">
    <md-icon>delete</md-icon>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "FundooDelete",
  data() {
    return {
      cartId: [],
      noteList: [],
    };
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
    sendToTrash: function () {
      const trashData = {
        isDeleted: true,
        noteIdList: [this.cartId],
      };
      NoteService.moveToTrash(trashData).then(() => {
        this.fetchNotes();
        eventBus.$emit("getUpdatedNoteList", this.noteList);
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

.more-options {
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  width: 10%;
}
</style>