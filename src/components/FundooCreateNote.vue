<template>
  <div class="create-note flex-properties">
    <div class="note flex-properties">
      <div @click="openNoteSpace()">
        <md-card id="header"> Take a note...</md-card>
      </div>
      <div id="notebox">
        <md-card id="note-card">
          <md-field md-inline>
            <label>Title</label>
            <md-input v-model="title"></md-input> </md-field
          ><br />
          <md-field md-inline>
            <label>Take a note</label>
            <md-textarea v-model="description" md-autogrow></md-textarea> </md-field
          ><br />
          <div class="notebox-icons">
            <span>
              <FundooColorPalette />
              <FundooArchive />
            </span>
            <button @click="closeNoteSpace()">Close</button>
          </div>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import FundooColorPalette from "./FundooColorPalette";
import FundooArchive from "./FundooArchive";
import UserService from '../services/UserService'

export default {
  data(){
    return{
      title:'',
      description:''
    }
  },
  components: {
    FundooColorPalette,
    FundooArchive,
  },
  methods: {
    openNoteSpace: function () {
      document.getElementById("note-card").style.display = "flex";
      document.getElementById("header").style.display = "none";
    },
    closeNoteSpace: function () {
       const note={
        title:this.title,
        description:this.description
      }

      UserService.addNote(note).then((response)=>{
        this.responseData=response.data
        this.title='';
        this.description='';
      })
      document.getElementById("note-card").style.display = "none";
      document.getElementById("header").style.display = "flex";
    },
  },
  created(){
    if(localStorage.getItem('token')==undefined)
    {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.flex-properties {
  display: flex;
  flex-direction: column;
}
.create-note {
  width: 85%;
  height: 684px;
}

.note {
  border-radius: 7px;
  width: 40%;
  margin-top: 5%;
  align-items: flex-start;
  justify-content: center;
  cursor: text;
  margin-left: 35%;
  box-shadow: 2px 3px 5px #e2e2e2;
  padding: 10px;
  font-weight: 600;
  font-size: 18px;
  font-family: "Google Sans", Roboto, Arial, sans-serif;
}

.md-card {
  padding: 4px;
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

#note-card {
  display: none;
}

#notebox {
  width: 100%;
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

.md-field:after,
.md-field:before {
  position: relative;
}

span {
  display: flex;
  flex-direction: row;
}
</style>