<template>
  <div class="color-palette">
    <md-menu md-direction="bottom-end" md-align-trigger>
      <md-icon md-menu-trigger>add_alert</md-icon>
      <md-menu-content class="reminder-content" id="reminderbox">
        <div id="menu-items">
          <label>Reminder:</label>
          <md-menu-item class="reminder-item"
            ><span class="duration">Later Today</span
            ><span class="duration times">8:00PM</span></md-menu-item
          >
          <md-menu-item class="reminder-item"
            ><span class="duration">Tomorrow</span
            ><span class="duration times">8:00AM</span></md-menu-item
          >
          <md-menu-item class="reminder-item"
            ><span class="duration">Next Week</span
            ><span class="duration times">Mon,8:00AM</span></md-menu-item
          >
          <md-menu-item class="reminder-item"
            ><span @click="openTimePicker" class="duration"
              >Pick date & time</span
            ></md-menu-item
          >
        </div>
        <div id="datetime-picker">
          <div id="inputbox">
            <Datepicker
              format="YYYY-MM-DD H:i:s"
              v-model="reminderDateTime"
              width="100%"
            ></Datepicker>
          </div>
          <div id="save"><button @click="closeTimePicker">Save</button></div>
        </div>
      </md-menu-content>
    </md-menu>
  </div>
</template>
<script>
import Datepicker from "vuejs-datetimepicker";
import NoteService from "../services/NoteService";
import {eventBus} from "../main";
export default {
  name: "ReminderIcon",
  data() {
    return {
      reminderDateTime: "",
    };
  },
  props: ["note"],
  components: {
    Datepicker,
  },
  methods: {
    openTimePicker: function () {
      document.getElementById("datetime-picker").style.display = "flex";
      document.getElementById("menu-items").style.display = "none";
    },
    closeTimePicker: function () {
      const reminderData = {
        noteIdList: [this.note],
        reminder: this.reminderDateTime,
      };
      NoteService.addReminder(reminderData).then(() => {
        document.getElementById("reminderbox").style.display = "none";
        eventBus.$emit("getUpdatedNoteList");
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../styles/style.scss";
.color-palette {
  cursor: pointer;
  margin-left: 5px;
}

#datetime-picker {
  display: none;
}

.md-menu-content-container {
  flex: 1;
  overflow: visible !important;
}

#inputbox {
  margin: auto 0px;
}

#save {
  width: 20px;
  margin: auto;
}

button {
  width: 100%;
  border: none;
  background-color: transparent;
}
</style>