<script setup>

defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false
  }
});

const emit = defineEmits(['close']);

const closeWindow = () => {
  emit('close');
};

const isUrl = (value) => {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

</script>

<template>
  <div class="window-overlay">
    <div class="window">
      <div class="window-header">
        <div class="window-title">
          <span class="window-icon">
            <template v-if="isUrl(icon)">
              <img :src="icon" alt="icon" class="icon-img" />
            </template>
            <template v-else>
              {{ icon }}
            </template>
          </span>

          {{ name }}
        </div>
        <div class="window-controls">
          <button class="control-btn close-btn" @click="closeWindow">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="window-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.window-overlay {
  position: fixed;
  bottom: 50%;
  right: 50%;
  width: calc(100vw - min(20px, 2%));
  height: calc(100vh - min(20px, 2%));
  transform: translateX(+50%) translateY(+50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  pointer-events: none;
}

.window {
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.5),
      0 0 1px rgba(255, 255, 255, 0.1) inset;
  display: flex;
  flex-direction: column;
  pointer-events: auto;
  animation: windowOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes windowOpen {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: rgba(30, 41, 59, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.window-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
}

.window-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 4px #3b82f6);
}

.window-icon img {
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 6px;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  transform: scale(1.05);
}

.close-btn:hover {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.window-content {
  flex: 1;
  overflow: hidden;
  border: rgba(30, 41, 59, 0.6) 5px solid;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 0 0 13px 13px;

}

.window-content::-webkit-scrollbar {
  width: 8px;
}

.window-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.window-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.window-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

</style>