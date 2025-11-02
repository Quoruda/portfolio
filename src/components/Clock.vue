<script setup>
import {onMounted, onUnmounted, ref} from "vue";

const currentTime = ref('')
let intervalId = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('fr-FR')
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 1000) // Met à jour chaque seconde
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})

</script>

<template>
  <div>{{ currentTime }}</div>
</template>

<style scoped>

</style>