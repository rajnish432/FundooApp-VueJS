<template>
  <div class="trash-main flex-properties">
    <div
      class="trash-container flex-properties"
      v-for="note in trashList"
      v-bind:key="note"
    >
      <md-card>
        <label class="content">{{ note.title }}</label
        ><br />
        <label class="description content">{{ note.description }}</label
        ><br />
        <div class="notebox-icons">
          <md-icon @click.native="deletePermanently(note.id)">delete</md-icon>
          <md-icon @click.native="restoreFromTrash(note.id)"
            >restore_from_trash</md-icon
          >
        </div>
      </md-card>
    </div>
  </div>
</template>
<script>
import NoteService from "../services/NoteService";
export default {
  name: "FundooTrash",
  data() {
    return {
      trashList: [],
    };
  },
  methods: {
    fetchTrashList: function () {
      NoteService.fetchTrashNotesList().then((response) => {
        this.trashList = response.data.data.data;
      });
    },
    deletePermanently: function (noteId) {
      const data = {
        noteIdList: [noteId],
      };
      NoteService.deleteForever(data).then(() => {
        this.trashList = [];
        this.fetchTrashList();
      });
    },
    restoreFromTrash: function (noteId) {
      const noteData = {
        isDeleted: false,
        noteIdList: [noteId],
      };
      NoteService.restoreTrashNotes(noteData).then(() => {
        this.trashList = [];
        this.fetchTrashList();
      });
    },
  },
  created() {
    this.fetchTrashList();
  },
};
</script>
<style scoped>
.flex-properties {
  display: flex;
  flex-direction: row;
}
.trash-main {
  margin-left: 20%;
  width: 60%;
  height: 684px;
  justify-content: center;
  flex-wrap: wrap;
}

.trash-container {
  margin-top: 20px;
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