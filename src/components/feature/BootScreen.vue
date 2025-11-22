<script setup>
import { ref, onMounted} from 'vue'

const isLoading = ref(true)

const emit = defineEmits(['boot-complete'])

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
    // Attendre la fin de l'animation de fondu avant d'émettre l'événement
    setTimeout(() => {
      emit('boot-complete')
    }, 400) // Durée de la transition fade-leave
  }, 800)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="isLoading" class="boot-screen">
      <div class="boot-background">
        <div class="boot-glow boot-glow-1"></div>
        <div class="boot-glow boot-glow-2"></div>
        <div class="boot-glow boot-glow-3"></div>
      </div>

      <div class="boot-content">
        <div class="boot-logo">◆</div>
        <div class="boot-text">Démarrage du système...</div>
        <div class="loading-bar">
          <div class="loading-progress"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.boot-screen {
  position: fixed;
  inset: 0;
  background: #0a0e27;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.boot-background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.boot-glow {
  position: absolute;
  filter: blur(120px);
  animation: bootGlow 1.2s ease-in-out infinite;
}

.boot-glow-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  top: 20%;
  right: 25%;
  opacity: 0.3;
}

.boot-glow-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: 20%;
  left: 20%;
  opacity: 0.25;
  animation-delay: 0.5s;
}

.boot-glow-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, #06b6d4 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.2;
  animation-delay: 0.25s;
}

@keyframes bootGlow {
  0%, 100% {
    opacity: 0.2;
    transform: scale(1);
  }
  50% {
    opacity: 0.4;
    transform: scale(1.08);
  }
}

.boot-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.boot-logo {
  font-size: 100px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulse 0.8s ease-in-out;
  filter: drop-shadow(0 0 30px rgba(59, 130, 246, 0.5));
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

.boot-text {
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
  font-weight: 400;
  letter-spacing: 0.5px;
  animation: fadeIn 0.25s ease-out 0s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.loading-bar {
  width: 250px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  overflow: hidden;
  animation: fadeIn 0.25s ease-out 0.2s both;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.loading-progress {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
  background-size: 200% 100%;
  border-radius: 10px;
  animation: loading 0.7s ease-out forwards, shimmer 0.6s linear infinite;
  box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
}

@keyframes loading {
  from { width: 0; }
  to { width: 100%; }
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.fade-enter-active {
  transition: opacity 300ms ease-out;
}

.fade-leave-active {
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.98);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 768px) {
  .boot-logo {
    font-size: 70px;
  }

  .boot-text {
    font-size: 16px;
  }

  .loading-bar {
    width: 200px;
  }
}
</style>