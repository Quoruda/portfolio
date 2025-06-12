<template>
  <div class="image-container">
    <img
      :src="currentSrc"
      :alt="alt"
      loading="lazy"
      class="image-component"
      @error="onImageError"
    >
    <span v-if="caption" class="image-caption">{{ caption }}</span>
    <button v-if="hasError" @click="reloadImage">Recharger l'image</button>
  </div>
</template>

<script>
export default {
  name: 'ImageComponent',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: 'Image'
    },
    caption: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentSrc: '',
      hasError: false
    }
  },
  mounted() {
    this.currentSrc = this.src;
  },
  methods: {
    onImageError() {
      this.hasError = true
    },
    reloadImage() {
      this.hasError = false
      this.currentSrc = ''
      this.$nextTick(() => {
        this.currentSrc = this.src
      })
    }
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
  max-height: 600px;
  min-height: 150px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
}

.image-component {
  max-width: min(800px, 92%);
  max-height: 600px;
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.image-component:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

.image-caption {
  margin-top: 4px;
  max-width: min(800px, 92%);
  text-align: center;
  color: #ccc;
  font-size: 1rem;
  font-style: italic;
  padding: 0 10px;
  line-height: 1.4;
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.image-container button {
  background-color: #2d89ef;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
  margin-top: 10px;
  font-weight: 500;
  position: absolute;
  top: 50%;
  right: 50%;
  z-index: 2;
  transform: translate(50%, -50%);
}
.image-container button::before {
  content: "↻ ";
}
</style>
