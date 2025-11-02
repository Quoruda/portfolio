<script setup>
import TaskBar from "./components/TaskBar.vue";
</script>

<template>
  <div class="desktop">
    <task-bar/>
  </div>



</template>

<style scoped>


.desktop {
  width: 100vw;
  height: 100vh;
  background: radial-gradient(ellipse at 10% 20%, rgba(16, 185, 129, 0.15), transparent 40%),
  radial-gradient(ellipse at 90% 70%, rgba(59, 130, 246, 0.15), transparent 40%),
  radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1), transparent 50%),
  linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
}


.taskbar {
  background: linear-gradient(to top,
  rgba(15, 23, 42, 0.85),
  rgba(15, 23, 42, 0.6));
  backdrop-filter: blur(60px) saturate(200%);
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.08),
  0 0 80px rgba(16, 185, 129, 0.05);
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  width: calc(100% - 40px);
  max-width: 800px;
  overflow: hidden;
}
</style>
