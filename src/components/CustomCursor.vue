<template>
  <div class="custom-cursor" ref="cursor"></div>
</template>

<script>
export default {
  name: "CustomCursor",
  mounted() {
    window.addEventListener("mousemove", this.updateCursorPosition);
    window.addEventListener("mouseleave", this.hideCursor);
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.updateCursorPosition);
    window.removeEventListener("mouseleave", this.hideCursor);
  },
  methods: {
    updateCursorPosition(event) {
      const cursor = this.$refs.cursor;
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.style.opacity = 1; // Réaffiche le curseur si caché
    },
    hideCursor() {
      const cursor = this.$refs.cursor;
      cursor.style.opacity = 0; // Cache le curseur
    },
  },
};
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: #ff9800;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: transform 0.1s ease, opacity 0.3s ease;
  z-index: 9999;
}
</style>
