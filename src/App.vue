<template>
  <div class="app">
    <CustomCursor />
    <HomeView />
  </div>
</template>

<script>
import HomeView from "@/views/HomeView.vue";
import CustomCursor from "@/components/CustomCursor.vue";

export default {
  name: "App",
  components: { HomeView, CustomCursor }
};
</script>

<style>
body {
  margin: 0;
  width: 100%;
  background-color: black;
  cursor: none; /* Cache le curseur par défaut */
}

* {
  cursor: none !important; /* Force la disparition du curseur partout */
}
</style>
