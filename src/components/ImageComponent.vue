<template>
  <div class="image-container">
    <img
      :src="src"
      :alt="alt"
      loading="lazy"
      class="image-component"
      @error="handleImageError"
      @load="imageLoaded"
      :class="{ 'image-loaded': isLoaded }"
      v-show="isLoaded"
    />
    <div class="image-placeholder" v-show="!isLoaded">
      <div class="loading-spinner" v-if="!hasError"></div>
      <div class="error-message" v-else>
        <span>{{ errorMessage }}</span>
        <button @click="retryLoading" class="retry-button">Réessayer</button>
      </div>
    </div>
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
    }
  },
  data() {
    return {
      isLoaded: false,
      hasError: false,
      errorMessage: "Problème de chargement de l'image"
    }
  },
  methods: {
    imageLoaded() {
      this.isLoaded = true;
      this.hasError = false;
    },
    handleImageError(e) {
      this.isLoaded = false;
      this.hasError = true;
      console.error("Erreur de chargement de l'image:", e);
    },
    retryLoading() {
      this.isLoaded = false;
      this.hasError = false;

      // Crée une nouvelle instance d'image avec timestamp pour éviter le cache
      const timestamp = new Date().getTime();
      const imgElement = this.$el.querySelector('img');
      imgElement.src = this.src.includes('?')
        ? `${this.src}&t=${timestamp}`
        : `${this.src}?t=${timestamp}`;
    }
  }
}
</script>

<style scoped>
.image-container {
  position: relative;
  min-height: 150px;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.image-component {
  max-width: min(800px, 92%);
  border-radius: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  opacity: 0;
  animation: fadeIn 0.5s forwards;
}

.image-loaded {
  opacity: 1;
}

.image-component:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(45, 45, 45, 0.1);
  border-radius: 14px;
  min-height: 150px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 174, 138, 0.3);
  border-top: 4px solid #ffae8a;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #d45d45;
  text-align: center;
  padding: 15px;
}

.retry-button {
  background-color: #ffae8a;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.retry-button:hover {
  background-color: #d45d45;
  color: white;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>