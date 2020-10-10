<template>
  <div class="display-notes">
    <DisplayNotes
      v-bind:noteList="filteredList"
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
      searchText:'',
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
    this.fetchArchiveList();
    eventBus.$on("unarchivedNote", () => {
      this.archiveList = [];
      this.fetchArchiveList();
    });

    eventBus.$on("searchCard", (data) => {
      this.searchText=data;
    });
  },
  computed:{
    filteredList:function(){
      return this.archiveList.filter((note)=>{
        return note.title.match(this.searchText);
      })
    }
  }
};
</script>
<style scoped>
.display-notes {
  display: flex;
  margin-top: 1%;
  flex-direction: row;
  width: auto;
  flex-wrap: wrap;
}
</style>