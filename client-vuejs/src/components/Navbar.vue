<template>
    <div id="nav">
      <h1>Weather logging</h1>

      <div class="menu">
        <router-link to="/">Home</router-link> |
        <router-link to="/projects" id="projects-link">Projects</router-link> |
        <router-link to="/about">About</router-link>
      </div>

      <div class="clear">
      </div>
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

  #nav h1{
    float: left;
    padding-left: 30px;
  }

  #nav .menu{
    line-height: 70px;
    float: right;
    padding-right: 30px;
  }

  #nav a{
    color: #fff;
    font-weight: bold;
    text-decoration: none;
  }

  #nav a.router-link-exact-active{
    color: #fccf59;
  }

</style>