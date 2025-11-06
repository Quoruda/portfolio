<script setup>

import Application from "./Application.vue";
import IconsContainer from "./IconsContainer.vue";

defineProps({
  icon: String,
  name: String
});

</script>

<template>
  <application :name="name" :icon="icon">
    <IconsContainer>
      <slot>

      </slot>
    </IconsContainer>
  </application>
</template>

<style scoped>

</style>