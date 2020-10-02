<template>
  <div class="login-container">
    <div id="label">
      <a>F</a>u<span class="a2">n</span><a>d</a><span class="a4">o</span>o
    </div>
    <h2>Sign in</h2>
    <h3>Continue to Fundoo</h3>
    <br />
    <md-field :class="emailValidation">
      <label>Email Id</label>
      <md-input v-model="email" required></md-input>
      <span class="md-error">Email is Required</span>
    </md-field>
    <md-field :class="passwordValidation">
      <label>Password</label>
      <md-input type="password" v-model="password" required></md-input>
      <span class="md-error">Password is Required</span>
    </md-field>
    <div class="loginbtn">
      <div class="back">
        <a href="http://fundoonotes.incubation.bridgelabz.com"
          >Create Account</a
        >
      </div>
      <md-button class="md-raised md-primary" @click="login">Log In</md-button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import userService from "../services/UserService";

export default {
  name: "UserLogin",
  data() {
    return {
      cartID: "",
      email: "",
      password: "",
      result: "",
      hasEmailError: false,
      hasPasswordError: false,
    };
  },
  methods: {
    login: function () {
      if (this.email == "" && this.password == "") {
        return (this.hasEmailError = true), (this.hasPasswordError = true);
      }
      if (this.email == "") {
        return (this.hasEmailError = true), (this.hasPasswordError = false);
      }
      if (this.password == "") {
        return (this.hasEmailError = false), (this.hasPasswordError = true);
      }
      const loginData = {
        cartID: this.cartID,
        email: this.email,
        password: this.password,
      };
      userService.getUserLoggedIn(loginData).then((response) => {
        this.result = response.data;
        localStorage.setItem("token", response.data.id);
        localStorage.setItem("username",response.data.firstName);
        localStorage.setItem("email",response.data.email);
        setTimeout(() => this.$router.push("home/note"), 3000);
      }),
        (error) => {
          console.log(error.message);
        };
      return (this.hasEmailError = false), (this.hasPasswordError = false);
    },
  },
  computed: {
    emailValidation() {
      return {
        "md-invalid": this.hasEmailError,
      };
    },
    passwordValidation() {
      return {
        "md-invalid": this.hasPasswordError,
      };
    },
  },
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 28%;
  padding: 40px;
  margin-top: 10%;
  border: 0.4px solid silver;
  border-radius: 7px;
}

#label {
  display: flex;
  flex-direction: row;
  font-size: 25px;
  font-family: fantasy;
  font-weight: bold;
  color: #d10303;
}

a {
  color: blue;
}

.a2 {
  color: #f0b000;
}

.a4 {
  color: #038803;
}

h3 {
  font-size: 20px;
  font-weight: 300;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  margin-top: 5px;
  display: flex;
  flex-direction: row;
}

.loginbtn {
  place-content: stretch flex-end;
  align-items: stretch;
  flex-direction: row;
  display: flex;
  width: 100%;
}

.loginbtn > button {
  min-width: 88px;
  line-height: 36px;
  padding: 0 16px;
  border-radius: 2px;
  overflow: visible;
  font-weight: 500;
  font-size: 15px;
  background-color: #1b66ca;
}

.back {
  color: #0606f8;
  cursor: pointer;
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  width: 100%;
}

@media screen and (max-width: 800px) {
  .login-container {
    width: 60%;
    margin-top: 50px;
  }
}

@media screen and (max-width: 420px) {
  .login-container {
    width: 88%;
    margin-top: 50px;
  }
}

@media screen and (max-width: 360px) {
  .login-container {
    width: 90%;
    margin-top: 50px;
  }
}
</style>