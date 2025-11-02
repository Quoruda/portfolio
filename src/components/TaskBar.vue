<script setup>

import Clock from "./Clock.vue";
</script>

<template>
  <div class="taskbar">
    <button class="user-profile">
      👤
      <span class="notification-badge">!</span>
    </button>
    <div class="system-tray">
      <div class="clock">
        <Clock/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.system-tray {
  display: flex;
  align-items: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.clock {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}

.user-profile {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.user-profile:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
}

@keyframes notificationPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); box-shadow: 0 2px 12px rgba(239, 68, 68, 0.8); }
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: 2px solid rgba(15, 23, 42, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: white;
  animation: notificationPulse 2s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
}
</style>