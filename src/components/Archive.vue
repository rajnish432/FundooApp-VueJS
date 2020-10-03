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
</style>