<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" v-bind:key="note.id">
      <md-card>
        <div class="card-items" @click="updateBoxData(note)">
          <label class="content">{{ note.title }}</label
          ><br />
          <label class="description content">{{ note.description }}</label
          ><br />
        </div>
        <div v-if="iconCategory == 'trash'" class="notebox-icons">
          <DeleteForeverIcon v-bind:noteId="note.id" />
          <RestoreTrashIcon v-bind:noteId="note.id" />
        </div>
        <div v-else class="notebox-icons">
          <ColorPaletteIcon />
          <ArchiveIcon />
          <DeleteIcon v-bind:note="note.id" />
        </div>
      </md-card>
    </div>
    <UpdateNote
      v-if="showUpdateBox"
      v-bind:showUpdateBox="showUpdateBox"
      v-bind:notedata="notedata"
    />
  </div>
</template>
<script>
import ColorPaletteIcon from "./ColorPaletteIcon";
import ArchiveIcon from "./ArchiveIcon";
import DeleteIcon from "./DeleteIcon";
import DeleteForeverIcon from "./DeleteForeverIcon";
import RestoreTrashIcon from "./RestoreTrashIcon";
import UpdateNote from "./UpdateNote";
import { eventBus } from "../main";

export default {
  name: "DisplayNotes",
  props: ["noteList", "iconCategory"],
  data() {
    return {
      cardId: [],
      showUpdateBox: false,
      notedata: {},
    };
  },
  components: {
    ColorPaletteIcon,
    ArchiveIcon,
    DeleteIcon,
    DeleteForeverIcon,
    RestoreTrashIcon,
    UpdateNote,
  },
  methods: {
    updateBoxData: function (note) {
      this.showUpdateBox = true;
      this.notedata = note;
    },
  },
  created() {
    eventBus.$on("closeDialogBox", (data) => {
      this.showUpdateBox = data;
    });
  },
};
</script>
<style scoped>
.display-notes {
  display: flex;
  margin-top: 1%;
  margin-left: 20%;
  flex-direction: row;
  width: 65%;
  flex-wrap: wrap;
}

.card-items {
  display: flex;
  flex-direction: column;

  height: min-content;

  text-align: start;
  padding: 10px;
}

.md-card {
  margin: 8px;
  padding: 18px;
  width: 190px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5%;
}
.content {
  font-weight: bold;
  font-size: 18px;
  max-width: 90%;
  opacity: 0.6;
  cursor: text;
  margin: 0px 0px 10px 0px;
}

.description {
  font-size: 16px;
  font-weight: 500;
}

.notebox-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>