<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const x = ref(0)
const y = ref(0)
const isTouchDevice = ref(false)

const handleMouseMove = (e) => {
  x.value = e.clientX
  y.value = e.clientY
}

onMounted(() => {
  // Détecter si c'est un appareil tactile
  isTouchDevice.value = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)

  // N'ajouter l'événement que si ce n'est pas un appareil tactile
  if (!isTouchDevice.value) {
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  if (!isTouchDevice.value) {
    window.removeEventListener('mousemove', handleMouseMove)
  }
})
</script>

<template>
  <div
      v-if="!isTouchDevice"
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