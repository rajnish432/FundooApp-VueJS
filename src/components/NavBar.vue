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
              <img v-bind:src="require('../assets/' + keepsrc)" />
              <span id="title"> Fundoo </span>
            </span>
          </div>
          <md-autocomplete
            class="search"
            v-model="searchText"
            :md-options="options"
            md-layout="box"
          >
            <label>Search...</label>
          </md-autocomplete>

          <div class="md-toolbar-section-end">
            <span class="listview">
              <md-button @click="list" class="md-icon-button menubtn list-view">
                <md-icon>view_list</md-icon>
              </md-button>
            </span>
            <md-menu md-size="medium" md-align-trigger>
              <md-button class="md-icon-button" md-menu-trigger>
                {{ firstName.substr(0, 1) }}
              </md-button>
              <md-menu-content>
                <div class="profile">
                  <md-button class="md-icon-button">
                    <label id="initials-name">{{
                      firstName.substr(0, 1)
                    }}</label> </md-button
                  ><br />
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
import { eventBus } from "../main";
export default {
  name: "NavBar",
  data() {
    return {
      searchText: "",
      options: [],
      showNavigation: false,
      keepsrc: "keep.png",
      selected: "",
      firstName: "",
      email: "",
      listView: false,
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
      if (selectedOption == "Archive") {
        this.$router.push("archive");
      }
      if (selectedOption == "Reminders") {
        this.$router.push("reminder");
      }
    },
    signout: function () {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      this.$router.push("/");
    },
    list: function () {
      if (this.listView == false) {
        this.listView = true;
      } else {
        this.listView = false;
      }
      eventBus.$emit("listView", this.listView);
    },
  },
  watch: {
    searchText: function () {
      eventBus.$emit("searchCard", this.searchText);
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

#initials-name {
  color: white;
}

.list-view {
  margin-right: 50% !important;
  width: auto;
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
  min-height: fit-content;
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
  color: white;
  border-radius: 7px;
}

.md-drawer {
  width: 17%;
}

.list-view {
  margin-left: 10%;
}
@media screen and (max-width: 1025px) {
  .navbar-items {
    min-height: 95vh;
  }

  .md-menu-content {
    width: 80%;
    left: 88px;
  }
}

@media screen and (max-width: 480px) {
  #title {
    display: none;
  }

  img {
    width: 100%;
  }

  .component {
    margin-left: 10px;
  }

  .md-drawer {
    width: 20%;
  }

  .listview{
    display: none;
  }

  .search{
    max-width: 52%;
    margin-left: 2% !important;
  }

  .md-title{
    width: 50px;
  }
}
</style>