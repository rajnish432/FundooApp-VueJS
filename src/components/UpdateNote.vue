<template>
  <div>
    <md-dialog :md-active.sync="showUpdateBox">
      <md-card id="note-card">
        <md-field> <md-input v-model="title"></md-input> </md-field><br />
        <md-field>
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
          <button @click="closeDialogBox">Close</button>
        </div>
      </md-card>
    </md-dialog>
  </div>
</template>
<script>
import ColorPaletteIcon from "./ColorPaletteIcon";
import ArchiveIcon from "./ArchiveIcon";
import { eventBus } from "../main";
export default {
  name: "UpdateNote",
  props: ["showUpdateBox", "notedata"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  methods: {
    closeDialogBox: function () {
      this.showUpdateBox = false;
      eventBus.$emit("closeDialogBox", this.showUpdateBox);
    },
  },

  mounted() {
    this.title = this.$props.notedata.title;
    this.description = this.$props.notedata.description;
  },

  components: {
    ColorPaletteIcon,
    ArchiveIcon,
  },
};
</script>
<style scoped>
.md-dialog /deep/.md-dialog-container {
  width: 40%;
  min-height: 20vh;
  border-radius: 7px;
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

.md-card {
  padding: 10px;
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

.md-field:after,
.md-field:before {
  position: relative;
}

span {
  display: flex;
}
</style>