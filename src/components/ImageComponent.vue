<template>
  <div class="image-container">
    <img
        :src="currentSrc"
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
    <figcaption v-if="caption" class="image-caption">{{ caption }}</figcaption>
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
    },
    timeout: {
      type: Number,
      default: 15000 // 15 secondes par défaut
    }
  },
  data() {
    return {
      isLoaded: false,
      hasError: false,
      errorMessage: "Problème de chargement de l'image",
      loadingTimer: null,
      currentSrc: ''
    }
  },
  mounted() {
    // Initialisation de la source avec éventuel timestamp pour éviter le cache
    this.currentSrc = this.src;
    this.startLoadingTimeout();
    
    // Vérifier si l'image est déjà en cache du navigateur
    const img = new Image();
    img.src = this.currentSrc;
    if (img.complete) {
      this.imageLoaded();
    }
  },
  beforeUnmount() {
    this.clearLoadingTimeout();
  },
  methods: {
    imageLoaded() {
      this.isLoaded = true;
      this.hasError = false;
      this.clearLoadingTimeout();
      this.$emit('image-loaded', true);
    },
    handleImageError(e) {
      this.isLoaded = false;
      this.hasError = true;
      this.clearLoadingTimeout();
      this.errorMessage = "Problème de chargement de l'image";
      console.error("Erreur de chargement de l'image:", e);
      this.$emit('image-error', { error: e, src: this.currentSrc });
    },
    retryLoading() {
      this.isLoaded = false;
      this.hasError = false;
      this.errorMessage = "Problème de chargement de l'image"; // Réinitialisation du message par défaut

      // Crée une nouvelle instance d'image avec timestamp pour éviter le cache
      const timestamp = new Date().getTime();
      this.currentSrc = this.src.includes('?')
          ? `${this.src}&t=${timestamp}`
          : `${this.src}?t=${timestamp}`;
      
      this.startLoadingTimeout();
      this.$emit('retry-loading', this.currentSrc);
      
      console.log("Tentative de rechargement de l'image:", this.currentSrc);
    },
    startLoadingTimeout() {
      this.clearLoadingTimeout();
      this.loadingTimer = setTimeout(() => {
        if (!this.isLoaded) {
          this.hasError = true;
          this.errorMessage = "Délai de chargement dépassé. Vérifiez votre connexion ou l'URL de l'image.";
          this.$emit('image-timeout');
        }
      }, this.timeout);
    },
    clearLoadingTimeout() {
      if (this.loadingTimer) {
        clearTimeout(this.loadingTimer);
        this.loadingTimer = null;
      }
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
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(45, 45, 45, 0.1);
  border-radius: 14px;
  min-height: 150px;
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
  max-width: 80%;
}

.retry-button {
  background-color: #ffae8a;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.retry-button:hover {
  background-color: #d45d45;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.retry-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0,0,0,0.2);
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
