<template>
  <div class="dashboard">
    <div class="navbar">
      <md-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button
              class="md-icon-button menubtn"
              @click="showNavigationSlider()"
            >
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
            <md-menu md-size="medium" md-align-trigger>
              <md-button class="md-icon-button" md-menu-trigger>
                <md-icon>person</md-icon>
              </md-button>
              <md-menu-content>
                <div class="profile">
                  <label class="profile-content name">{{ firstName }}</label
                  ><br />
                  <label class="profile-content">{{ email }}</label
                  ><br />
                  <md-button id="signout" @click="signout">Sign-out</md-button>
                </div>
              </md-menu-content>
            </md-menu>
          </div>
        </div>
      </md-toolbar>
    </div>
    <div class="navbar-items">
      <md-drawer
        :md-active.sync="showNavigation"
        md-swipeable
        md-permanent="clipped"
        md-persistent="mini"
      >
        <md-list>
          <md-list-item @click="goTo('Notes')" id="Notes">
            <md-icon>emoji_objects</md-icon>
            <span class="md-list-item-text">Notes</span>
          </md-list-item>

          <md-list-item @click="goTo('Reminders')" id="Reminders">
            <md-icon>notifications</md-icon>
            <span class="md-list-item-text">Reminders</span>
          </md-list-item>

          <md-list-item @click="goTo('Labels')" id="Labels">
            <md-icon>edit</md-icon>
            <span class="md-list-item-text">Edit Labels</span>
          </md-list-item>

          <md-list-item @click="goTo('Archive')" id="Archive">
            <md-icon>archive</md-icon>
            <span class="md-list-item-text">Archive</span>
          </md-list-item>

          <md-list-item @click="goTo('Trash')" id="Trash">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Trash</span>
          </md-list-item>
        </md-list>
      </md-drawer>
      <div class="component">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      searchResult: null,
      showNavigation: false,
      noteList: [],
      keepsrc: "keep.png",
      selected: "",
      firstName: "",
      email: "",
    };
  },
  methods: {
    showNavigationSlider: function () {
      if (this.showNavigation == false) {
        return (this.showNavigation = true);
      }
      this.showNavigation = false;
    },
    goTo: function (selectedOption) {
      var styleproperty = document.getElementById(selectedOption).style;
      if (this.selected.length != 0) {
        document.getElementById(this.selected).setAttribute("style", "");
      }
      styleproperty.backgroundColor = "#888785";
      styleproperty.borderTopRightRadius = "20px";
      styleproperty.borderBottomRightRadius = "20px";
      this.selected = selectedOption;
      if (selectedOption == "Notes") {
        this.$router.push("note");
      }
      if (selectedOption == "Trash") {
        this.$router.push("trash");
      }
    },
    signout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.$router.push("/");
    },
  },
  created() {
    this.firstName = localStorage.getItem("username");
    this.email = localStorage.getItem("email");
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

.md-list-item:hover {
  cursor: pointer;
  background-color: whitesmoke;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
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
  max-width: 44%;
  display: flex;
  flex-direction: row;
  background-color: rgb(243, 240, 240) !important;
}

.md-toolbar .md-autocomplete.md-theme-default.md-autocomplete-box {
  height: 44px;
  border-radius: 7px;
  padding-right: inherit;
}

.md-title {
  color: grey !important;
  margin-right: 20% !important;
}

img {
  width: 10%;
}

.component {
  width: 85%;
  display: flex;
  min-height: initial;
  flex-direction: column;
}

.navbar-items {
  display: flex;
  min-height: 91vh;
}

.md-field .md-input,
.md-field .md-textarea {
  width: 100% !important;
}

.md-menu-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20%;
  min-height: 30vh;
}

.md-icon-button {
  border: 1px solid grey;
  background-color: rgb(143, 143, 255);
}

.menubtn {
  background-color: transparent;
  border: none;
}

.profile {
  width: 100%;
  padding-top: 50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-content {
  font-family: Arial, Helvetica, sans-serif;
  font-size: large;
}

.name {
  text-transform: capitalize;
}

#signout {
  background-color: rgb(143, 143, 255);
  width: 40%;
}
</style>