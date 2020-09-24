<template>
  <div class="login-container">
    <div id="label"><a>F</a>u<a2>n</a2><a>d</a><a4>o</a4>o</div>
    <br />
    <h2>Sign in</h2>
    <br />
    <p>Continue to Fundoo</p>
    <br />
    <md-field>
      <label>Email Id*</label>
      <md-input v-model="type"></md-input>
    </md-field>
    <md-field>
      <label>Password*</label>
      <md-input v-model="type" type="password"></md-input>
    </md-field>
    <div class="loginbtn"><button type="submit">Login</button></div>
    <div class="back">Forget Password?</div>
  <div class="back">Create Account</div>
  </div>
</template>

<script>
export default {
  name: "FundooLogin",
};
</script>
<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 32%;
  padding: 24px;
  margin-top: 5%;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
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

a2 {
  color: #f0b000;
}

a4 {
  color: #038803;
}

p {
  font-size: 25px;
  font-weight: 400;
  font-family: Roboto, "Helvetica Neue", sans-serif;
  display: flex;
  flex-direction: row;
}

.loginbtn {
  place-content: stretch flex-end;
  align-items: stretch;
  flex-direction: row;
  box-sizing: border-box;
  display: flex;
  width: 100%;
}

.loginbtn>button{
      min-width: 88px;
    line-height: 36px;
    padding: 0 16px;
    border-radius: 2px;
    overflow: visible;
    background-color: #3e3eee;
}

.back {
    color: #0606f8;
    cursor: pointer;
    margin: 5px 0px 0px 0px;
    display: flex;
    flex-direction: row;
    width:100%;
}
</style>