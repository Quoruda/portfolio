<script setup>
import ApplicationIcon from "./ApplicationIcon.vue";
import Window from "./Window.vue";
import {ref} from "vue";

defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})

const isOpen = ref(false);

</script>

<template>
  <application-icon :name="name" :icon="icon" @click="isOpen=true"/>
  <window v-if="isOpen" :name="name" :icon="icon" @close="isOpen=false">
    <slot>

    </slot>
  </window>
</template>

<style scoped>

</style>