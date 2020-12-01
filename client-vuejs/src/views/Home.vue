<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Statistics/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Statistics from '@/components/Statistics.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Statistics
  }
}
</script>

<style scoped>
  img{
    width: 150px;
    height: auto;
    margin-top: 20px;
  }
</style>