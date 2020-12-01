<template>
  <div id="app">
    <NavBar/>

    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/Navbar.vue';

export default {
  name: 'App',
  components:{
    NavBar,
  }
}
</script>

<style>
body{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clear{
  clear: both;
}

</style>
