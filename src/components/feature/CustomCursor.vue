<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)

const handleMouseMove = (e) => {
  x.value = e.clientX
  y.value = e.clientY
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div
      class="custom-cursor"
      :style="{ top: y + 'px', left: x + 'px' }"
  >
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="#1e293b" stroke="white" stroke-width="1.5"/>
    </svg>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  transition: transform 0.15s ease-out;
}

.custom-cursor svg {
  width: 24px;
  height: 24px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.custom-cursor.clicking {
  transform: scale(0.9);
}

.custom-cursor.hovering {
  transform: scale(1.1);
}
</style>