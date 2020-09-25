<template>
  <div class="navbar">
    <md-toolbar class="md-primary">
      <div class="md-toolbar-row">
        <div class="md-toolbar-section-start">
          <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
          </md-button>
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
</template>

<script>
export default {
  name: "FundooNavBar",
  data() {
    return {
      searchResult: null,
      noteList: [],
    };
  },
};
</script>
<style scoped>
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
}
</style>