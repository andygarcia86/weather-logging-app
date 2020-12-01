<template>
    <div id="nav">
      <h1>Weather logging</h1>

      <router-link to="/">Home</router-link> |
      <router-link to="/projects" id="projects-link">Projects</router-link> |
      <router-link to="/about">About</router-link>
    </div>
</template>

<script>
export default {
    name: 'NavBar',

}
</script>

<style scoped>

  #nav{
    background-color: #2196F3;
    color: #fff;
  }

  #nav a{
    color: #fff;
  }

  #nav a.router-link-exact-active{
    color: #fccf59;
  }

</style>