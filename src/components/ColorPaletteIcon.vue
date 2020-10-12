<template>
  <div class="color-palette">
    <md-menu md-size="medium" md-align-trigger md-direction="top-start">
      <md-icon md-menu-trigger>palette</md-icon>
      <md-menu-content>
        <div class="color-items">
          <div
            class="color-tray"
            v-for="(color, index) in colorArray"
            v-bind:key="index"
            v-bind:style="{ background: color.color }"
            @click="setColor(color.color)"
          ></div>
        </div>
      </md-menu-content>
    </md-menu>
  </div>
</template>

<script>
import { eventBus } from "../main";
import NoteService from "../services/NoteService";
export default {
  name: "ColorPaletteIcon",
  props: ["note", "createNote"],
  data() {
    return {
      colorArray: [
        { color: "#F28B82" },
        { color: "#FBBC04" },
        { color: "#FFF475" },
        { color: "#CCFF90" },
        { color: "#D7AEFB" },
        { color: "#A7FFEB" },
        { color: "#CBF0F8" },
        { color: "#FFFFFF" },
      ],
    };
  },
  methods: {
    setColor: function (colorId) {
      if (this.createNote == true) {
        eventBus.$emit("getColorUpdated", colorId);
      } else {
        eventBus.$emit("getUpdated", colorId);
        const colorData = {
          color: colorId,
          noteIdList: [this.note],
        };
        NoteService.changeCardColor(colorData).then(() => {
          eventBus.$emit("getUpdatedNoteList");
        });
      }
    },
  },
};
</script>

<style scoped>
.color-palette {
  cursor: pointer;
}

.md-menu-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: 9999;
  width: 12%;
  min-height: fit-content;
  position: absolute;
}

.color-items {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 6px;
}

.color-tray {
  width: 22%;
  height: 40px;
  border-radius: 50%;
  margin: 2px;
  border: 1px solid rgb(204, 204, 204);
}
</style>