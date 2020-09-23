<template>
  <div id="app">
    <FundooHome/>
  </div>
</template>

<script>
import FundooHome from './components/FundooHome'
export default {
  name: 'App',
  components:{
    FundooHome
  }
}
</script>

<style>
#app {
  width: 100%;
  border: 1px solid;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
