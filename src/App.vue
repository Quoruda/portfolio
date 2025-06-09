<template>
  <div class="app">
     <HomeView/>
  </div>
</template>


<script>


import HomeView from "@/views/HomeView.vue";

export default {
  name: 'App',
  components: {HomeView},
  data() {

  }
};
</script>

<style>

body{
  margin: 0;
  width: 100%;
  background-color: black;
}

</style>
