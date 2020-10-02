<template>
  <div class="trash-main flex-properties">
    <div class="trash-container flex-properties">
      <DisplayNotes
        v-bind:noteList="trashList"
        v-bind:iconCategory="iconCategory"
      />
    </div>
  </div>
</template>
<script>
import NoteService from "../services/NoteService";
import DisplayNotes from "./DisplayNotes";
import { eventBus } from "../main";
export default {
  name: "Trash",
  data() {
    return {
      trashList: [],
      iconCategory: "trash",
    };
  },
  components: {
    DisplayNotes,
  },
  methods: {
    fetchTrashList: function () {
      NoteService.fetchTrashNotesList().then((response) => {
        this.trashList = response.data.data.data;
      });
    },
  },
  created() {
    if (localStorage.getItem("token") == undefined) {
      this.$router.push("/");
    }
    
    this.fetchTrashList();
    eventBus.$on("getTrashList", () => {
      this.trashList = [];
      this.fetchTrashList();
    });

    eventBus.$on("restoreTrashList", () => {
      this.trashList = [];
      this.fetchTrashList();
    });
  },
};
</script>
<style scoped>
.flex-properties {
  display: flex;
  flex-direction: row;
}
.trash-main {
  width: 100%;
  min-height: fit-content;
  justify-content: center;
  flex-wrap: wrap;
}

.trash-container {
  margin-top: 20px;
  width: 80%;
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
  justify-content: space-between;
}

.md-icon {
  cursor: pointer;
}
</style>