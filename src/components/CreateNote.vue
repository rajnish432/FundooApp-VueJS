<template>
  <div class="create-note flex-properties">
    <div class="note flex-properties">
      <div @click="openNoteSpace()">
        <md-card id="header"> Take a note...</md-card>
      </div>
      <div id="notebox">
        <md-card id="note-card">
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
              <ColorPaletteIcon />
              <ArchiveIcon />
            </span>
            <button @click="closeNoteSpace()">Close</button>
          </div>
        </md-card>
      </div>
    </div>
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
      };
      NoteService.addNote(note).then((response) => {
        this.responseData = response.data;
        this.title = "";
        this.description = "";
      });
      document.getElementById("note-card").style.display = "none";
      document.getElementById("header").style.display = "flex";
      eventBus.$emit("getUpdatedNoteList");
    },
  },
  created() {
    if (localStorage.getItem("token") == undefined) {
      this.$router.push("/");
    }
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
    min-width: 78%;
    padding: 20px;
    margin-left: 22%;
  }
}
</style>