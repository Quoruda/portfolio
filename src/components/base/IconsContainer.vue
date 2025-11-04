<script setup>
</script>

<template>
  <div class="icons-container">
    <slot>

    </slot>
  </div>
</template>

<style scoped>
.icons-container{
  flex: 1;
  padding: 20px 40px 120px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-content: flex-start;
  justify-content: center;
  overflow-y: auto;
  position: relative;
  z-index: 1;
}
</style>