<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" v-bind:key="note.id">
      <md-card @click.native="getID(note)">
        <label class="content">{{ note.title }}</label
        ><br />
        <label class="description content">{{ note.description }}</label
        ><br />
        <div v-if="iconCategory == 'trash'" class="notebox-icons">
          <DeleteForeverIcon />
          <RestoreTrashIcon />
        </div>
        <div v-else class="notebox-icons">
          <ColorPaletteIcon />
          <ArchiveIcon />
          <DeleteIcon />
        </div>
      </md-card>
    </div>
  </div>
</template>
<script>
import ColorPaletteIcon from "./ColorPaletteIcon";
import ArchiveIcon from "./ArchiveIcon";
import DeleteIcon from "./DeleteIcon";
import { eventBus } from "../main";
import DeleteForeverIcon from "./DeleteForeverIcon";
import RestoreTrashIcon from "./RestoreTrashIcon";

export default {
  name: "DisplayNotes",
  props: ["noteList", "iconCategory"],
  data() {
    return {
      cardId: [],
    };
  },
  components: {
    ColorPaletteIcon,
    ArchiveIcon,
    DeleteIcon,
    DeleteForeverIcon,
    RestoreTrashIcon,
  },
  methods: {
    getID: function (data) {
      this.cardId = data.id;
      eventBus.$emit("getNoteId", this.cardId);
    },
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

.md-card {
  margin: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 5%;
  height: min-content;
  width: 190px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  text-align: start;
  padding: 18px;
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