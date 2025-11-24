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
  },
  showIcon: {
    type: Boolean,
    default: true
  }
})

const isOpen = ref(false);

const open = () => {
  isOpen.value = true;
};

defineExpose({
  open,
  isOpen
});

</script>

<template>
  <application-icon v-if="showIcon" :name="name" :icon="icon" @click="isOpen=true"/>
  <window v-if="isOpen" :name="name" :icon="icon" @close="isOpen=false">
    <slot>

    </slot>
  </window>
</template>

<style scoped>

</style>