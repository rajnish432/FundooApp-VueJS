<template>
  <div class="display-notes">
    <DisplayNotes
      v-bind:noteList="filteredList"
    />
  </div>
</template>
<script>
import DisplayNotes from "./DisplayNotes";
import NoteService from "../services/NoteService";
import {eventBus} from '../main'
export default {
  name: "Reminders",
  data() {
    return {
      reminderList: [],
      searchText:'',
    };
  },
  components: {
    DisplayNotes,
  },
  methods: {
    fetchReminderList: function () {
      NoteService.getReminderList().then((response) => {
        this.reminderList = response.data.data.data;
      });
    },
  },
  created() {
    if (localStorage.getItem("token") == undefined) {
      this.$router.push("/");
    }
    this.fetchReminderList();
    eventBus.$on("searchCard", (data) => {
      this.searchText=data;
    });
  },
  computed:{
    filteredList:function(){
      return this.reminderList.filter((note)=>{
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