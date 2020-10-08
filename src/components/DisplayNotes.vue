<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" v-bind:key="note.id">
      <md-card class="cards" v-bind:style="{ background: note.color }">
        <div class="card-items" @click="updateBoxData(note)">
          <label class="content">{{ note.title }}</label
          >
          <label class="description content">{{ note.description }}</label
          >
        </div>
        <div v-if="note.reminder[0]!=null" id="reminderBox">
            <span id="clockicon"><md-icon md-menu-trigger>schedule</md-icon></span>
            <span id="datetime">{{note.reminder[0].slice(0,24)}}</span>
            <span id="closeicon"><md-icon md-menu-trigger>highlight_off</md-icon></span>
        </div><br>
        <div v-if="iconCategory == 'trash'" class="notebox-icons">
          <DeleteForeverIcon v-bind:noteId="note.id" />
          <RestoreTrashIcon v-bind:noteId="note.id" />
        </div>
        <div v-else-if="iconCategory == 'archive'" class="notebox-icons">
          <UnarchiveIcon v-bind:noteId="note.id" />
        </div>
        <div v-else class="notebox-icons">
          <ColorPaletteIcon v-bind:note="note.id" />
          <ReminderIcon v-bind:note="note.id"/>
          <ArchiveIcon v-bind:note="note.id" />
          <DeleteIcon v-bind:note="note.id" />
        </div>
      </md-card>
    </div>
    <UpdateNote
      v-if="showUpdateBox"
      v-bind:showUpdateBox="showUpdateBox"
      v-bind:noteData="noteData"
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
import UnarchiveIcon from "./UnarchiveIcon";
import ReminderIcon from './ReminderIcon';
import { eventBus } from "../main";

export default {
  name: "DisplayNotes",
  props: ["noteList", "iconCategory"],
  data() {
    return {
      cardId: [],
      showUpdateBox: false,
      noteData: {},
    };
  },
  components: {
    ColorPaletteIcon,
    ArchiveIcon,
    DeleteIcon,
    DeleteForeverIcon,
    RestoreTrashIcon,
    UpdateNote,
    UnarchiveIcon,
    ReminderIcon,
  },
  methods: {
    updateBoxData: function (note) {
      this.showUpdateBox = true;
      this.noteData = note;
    },
  },
  created() {
    eventBus.$on("closeDialogBox", (data) => {
      this.showUpdateBox = data;
    });

    eventBus.$on("listView", (data) => {
      if (data == true) {
        document.getElementsByClassName(
          "display-notes"
        )[0].style.flexDirection = "column";
        var styleProperty=document.getElementsByClassName(
          "cards"
        )
        for( var i=0;i<styleProperty.length;i++){
          styleProperty[i].style["width"]="80%"
        }
      }
      if (data == false) {
        document.getElementsByClassName(
          "display-notes"
        )[0].style.flexDirection = "row";
        var styleProp=document.getElementsByClassName(
          "cards"
        )
        for( var j=0;j<styleProp.length;j++){
          styleProp[j].style["width"]="300px"
        }
      }
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
  width: 80%;
  flex-wrap: wrap;
}

.card-items {
  display: flex;
  flex-direction: column;
  height: min-content;
  text-align: start;
  padding: 10px;
}

.cards {
  margin: 10px;
  padding: 18px;
  width: 300px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 10px;
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

#reminderBox{
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  background-color: rgb(226, 226, 226);
  border-radius:18px ;
  height: 40px;
  margin-left: 3%;
}

#clockicon{
  width: 20%;
  display: flex;
  align-items: center;
}

#closeicon{
  width: 20%;
  display: flex;
  align-items: center;
  visibility: hidden;
}

#reminderBox:hover>#closeicon{
  visibility: visible;
}

#datetime{
  width: 60%;
  font-size: x-small;
}

@media screen and (max-width: 420px){
  .display-notes{
    width: 80%;
  }
}
</style>