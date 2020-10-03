<template>
  <div>
    <md-dialog :md-active.sync="showUpdateBox">
      <md-card id="note-card">
        <md-field> <md-input v-model="title"></md-input> </md-field><br />
        <md-field>
          <md-textarea
            v-model="description"
            md-autogrow
          ></md-textarea> </md-field
        ><br />
        <div class="notebox-icons">
          <span>
            <ColorPaletteIcon />
            <ArchiveIcon />
          </span>
          <button @click="closeDialogBox">Close</button>
        </div>
      </md-card>
    </md-dialog>
  </div>
</template>
<script>
import ColorPaletteIcon from "./ColorPaletteIcon";
import ArchiveIcon from "./ArchiveIcon";
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "UpdateNote",
  props: ["showUpdateBox", "noteData"],
  data() {
    return {
      title: "",
      description: "",
      noteId: "",
    };
  },
  methods: {
    closeDialogBox: function () {
      const updateData = {
        noteId: this.noteId,
        title: this.title,
        description: this.description,
      };
      NoteService.updateNotes(updateData).then(() => {
        this.showUpdateBox = false;
        eventBus.$emit("closeDialogBox", this.showUpdateBox);
        eventBus.$emit("getUpdatedNoteList");
      });
    },
  },

  mounted() {
    this.noteId = this.$props.noteData.id;
    this.title = this.$props.noteData.title;
    this.description = this.$props.noteData.description;
  },

  components: {
    ColorPaletteIcon,
    ArchiveIcon,
  },
};
</script>
<style scoped>
.md-dialog /deep/.md-dialog-container {
  width: 40%;
  height: fit-content;
  border-radius: 7px;
}

.notebox-icons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.notebox-icons > button {
  width: 15%;
  font-size: 15px;
  display: flex;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.md-card {
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
}

.md-field {
  font-weight: 600;
  font-size: 16px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
}

.md-field:after,
.md-field:before {
  position: relative;
}

span {
  display: flex;
}
</style>