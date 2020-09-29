<template>
  <div class="display-notes">
    <div class="note-cards" v-for="note in noteList" v-bind:key="note">
      <md-card @click.native="getID(note)">
        <label class="content">{{ note.title }}</label
        ><br />
        <label class="description content">{{ note.description }}</label
        ><br />
        <div class="notebox-icons">
          <FundooColorPalette />
          <FundooArchive />
          <FundooDelete />
        </div>
      </md-card>
    </div>
  </div>
</template>
<script>
import UserService from "../services/UserService";
import FundooColorPalette from "./FundooColorPalette";
import FundooArchive from "./FundooArchive";
import FundooDelete from "./FundooDelete";
import { eventBus } from "../main";

export default {
  name: "FundooNotes",
  data() {
    return {
      noteList: [],
      cardId: [],
    };
  },
  components: {
    FundooColorPalette,
    FundooArchive,
    FundooDelete,
  },
  methods: {
    fetchNotes: function () {
      UserService.fetchNotesList().then((response) => {
        response.data.data.data.forEach((element) => {
          if (element.isDeleted == false && element.isArchived == false) {
            this.noteList.push(element);
          }
        });
      });
    },
    getID: function (data) {
      this.cardId = data.id;
      eventBus.$emit("getNoteId", this.cardId);
    },
  },
  created() {
    this.fetchNotes();
    eventBus.$on("getUpdatedNoteList", (data) => {
      this.noteList = data;
    });
  },
};
</script>
<style scoped>
.display-notes {
  display: flex;
  margin-top: 2%;
  margin-left: 18%;
  flex-direction: row;
  width: 60%;
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