<template>
  <div class="create-note flex-properties">
    <div class="note flex-properties">
      <div @click="openNoteSpace()">
        <md-card id="header"> Take a note...</md-card>
      </div>
      <div id="notebox">
        <md-card id="note-card" v-bind:style="{ background: cardColor }">
          <md-field md-inline>
            <label>Title</label>
            <md-input v-model="title"></md-input> </md-field
          ><br />
          <md-field md-inline>
            <label>Take a note</label>
            <md-textarea
              v-model="description"
              md-autogrow
            ></md-textarea> </md-field
          ><br />
          <div class="notebox-icons">
            <span>
              <ColorPaletteIcon v-bind:createNote="createNote" />
              <ArchiveIcon />
            </span>
            <button @click="closeNoteSpace()">Close</button>
          </div>
        </md-card>
      </div>
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
import ColorPaletteIcon from "./ColorPaletteIcon";
import ArchiveIcon from "./ArchiveIcon";
import NoteService from "../services/NoteService";
import { eventBus } from "../main";

export default {
  data() {
    return {
      title: "",
      description: "",
      noteList: [],
      cardColor: "",
      createNote: true,
      isArchived: false,
      showSnackbar: false,
    };
  },
  components: {
    ColorPaletteIcon,
    ArchiveIcon,
  },
  methods: {
    openNoteSpace: function () {
      document.getElementById("note-card").style.display = "flex";
      document.getElementById("header").style.display = "none";
    },
    closeNoteSpace: function () {
      const note = {
        title: this.title,
        description: this.description,
        color: this.cardColor,
        isArchived: this.isArchived,
      };
      NoteService.addNote(note).then((response) => {
        this.showSnackbar = true;
        this.result = "Note Added Successfully";
        this.responseData = response.data;
        this.title = "";
        this.description = "";
      });
      document.getElementById("note-card").style.display = "none";
      document.getElementById("header").style.display = "flex";
      this.cardColor = "#FFFFFF";
      this.isArchived = false;
      eventBus.$emit("getUpdatedNoteList");
    },
  },
  created() {
    eventBus.$on("getColorUpdated", (data) => {
      this.cardColor = data;
    });
    eventBus.$on("isArchived", (data) => {
      this.isArchived = data;
    });
  },
};
</script>

<style scoped>
.flex-properties {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create-note {
  width: 100%;
}

.note {
  border-radius: 7px;
  width: 48%;
  margin-top: 2%;
  align-items: flex-start;
  justify-content: center;
  cursor: text;
  margin-left: 6%;
  box-shadow: 2px 3px 5px #e2e2e2;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
}

.md-card {
  padding: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: none;
}

.md-field {
  font-weight: 600;
  margin: 0%;
  font-size: 16px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
}

#note-card {
  display: none;
}

#notebox {
  width: 100%;
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

.md-field:after,
.md-field:before {
  position: relative;
}

span {
  display: flex;
  flex-direction: row;
}

#header {
  opacity: 0.6;
}

@media screen and (max-width: 480px) {
  .note {
    min-width: 83%;
    padding: 20px;
    margin-left: 32%;
  }
}
</style>