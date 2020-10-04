<template>
  <div class="color-palette">
    <md-menu md-size="medium" md-align-trigger md-direction="top-start">
      <md-icon md-menu-trigger>palette</md-icon>
      <md-menu-content>
        <div class="color-items">
          <div class="color-tray" id="red" @click="setColor('#F28B82')"></div>
          <div
            class="color-tray"
            id="orange"
            @click="setColor('#FBBC04')"
          ></div>
          <div
            class="color-tray"
            id="yellow"
            @click="setColor('#FFF475')"
          ></div>
          <div class="color-tray" id="green" @click="setColor('#CCFF90')"></div>
          <div
            class="color-tray"
            id="purple"
            @click="setColor('#D7AEFB')"
          ></div>
          <div class="color-tray" id="cyan" @click="setColor('#A7FFEB')"></div>
          <div class="color-tray" id="blue" @click="setColor('#CBF0F8')"></div>
          <div
            class="color-tray"
            id="transparent"
            @click="setColor('#FFFFFF')"
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
  props: ["note"],
  methods: {
    setColor: function (colorId) {
      const colorData = {
        color: colorId,
        noteIdList: [this.note],
      };
      NoteService.changeCardColor(colorData).then(() => {
        eventBus.$emit("getUpdatedNoteList");
      });
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
  width: 12%;
  min-height: fit-content;
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

#red {
  background-color: #f28b82;
}

#orange {
  background-color: #fbbc04;
}

#yellow {
  background-color: #fff475;
}

#green {
  background-color: #ccff90;
}

#cyan {
  background-color: #a7ffeb;
}

#blue {
  background-color: #cbf0f8;
}

#purple {
  background-color: #d7aefb;
}

#transparent {
  background-color: #ffffff;
}
</style>