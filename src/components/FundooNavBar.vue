<template>
  <div class="dashboard">
    <div class="navbar">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="showNavigationSlider()">
              <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title">
              <img v-bind:src="require('../assets/' + keepsrc)" /> Fundoo
            </span>
          </div>
          <md-autocomplete
            class="search"
            v-model="searchResult"
            :md-options="noteList"
            md-layout="box"
          >
            <label>Search...</label>
          </md-autocomplete>

          <div class="md-toolbar-section-end">
            <md-button class="md-icon-button">
              <md-icon>person</md-icon>
            </md-button>
          </div>
        </div>
      </md-toolbar>
    </div>
    <md-drawer
      :md-active.sync="showNavigation"
      md-swipeable
      md-persistent="mini"
    >
      <md-list>
        <md-list-item>
          <md-icon>emoji_objects</md-icon>
          <span class="md-list-item-text">Notes</span>
        </md-list-item>

        <md-list-item>
          <md-icon>notifications</md-icon>
          <span class="md-list-item-text">Reminders</span>
        </md-list-item>

        <md-list-item>
          <md-icon>edit</md-icon>
          <span class="md-list-item-text">Edit Labels</span>
        </md-list-item>

        <md-list-item>
          <md-icon>archive</md-icon>
          <span class="md-list-item-text">Archive</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>
      </md-list>
    </md-drawer>
  </div>
</template>

<script>
export default {
  name: "FundooNavBar",
  data() {
    return {
      searchResult: null,
      showNavigation: false,
      noteList: [],
      keepsrc: "keep.png",
    };
  },
  methods: {
    showNavigationSlider: function () {
      if (this.showNavigation == false) {
        return (this.showNavigation = true);
      }
      this.showNavigation = false;
    },
  },
};
</script>
<style scoped>
.dashboard {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.navbar {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
}

.md-toolbar.md-theme-default.md-primary {
  background-color: transparent;
  box-shadow: none;
  border-bottom: 2px solid silver;
}

.md-icon {
  color: black !important;
}

.search {
  max-width: 650px;
  background-color: rgb(243, 240, 240) !important;
}

.md-toolbar .md-autocomplete.md-theme-default.md-autocomplete-box {
  height: 50px;
  border-radius: 7px;
}

.md-drawer.md-theme-default.md-persistent-mini.md-left {
  width: 15%;
  height: 684px;
  margin-top: 1px;
}

.md-title {
  color: grey !important;
  margin-right: 20% !important;
}

img {
  width: 12%;
}
</style>