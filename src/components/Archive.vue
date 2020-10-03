<template>
  <div class="display-notes">
    <DisplayNotes
      v-bind:noteList="archiveList"
      v-bind:iconCategory="iconCategory"
    />
  </div>
</template>
<script>
import DisplayNotes from "./DisplayNotes";
import NoteService from "../services/NoteService";
import {eventBus} from '../main'
export default {
  name: "Archive",
  data() {
    return {
      archiveList: [],
      iconCategory: "archive",
    };
  },
  components: {
    DisplayNotes,
  },
  methods: {
    fetchArchiveList: function () {
      NoteService.fetchArchiveNotes().then((response) => {
        this.archiveList = response.data.data.data;
      });
    },
  },
  created() {
    if (localStorage.getItem("token") == undefined) {
      this.$router.push("/");
    }
    this.fetchArchiveList();
    eventBus.$on("unarchivedNote", () => {
      this.archiveList = [];
      this.fetchArchiveList();
    });
  },
};
</script>
<style scoped>
.display-notes {
  display: flex;
  margin-top: 1%;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
}
</style>