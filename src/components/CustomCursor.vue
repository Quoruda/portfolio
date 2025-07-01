<template>
  <div class="custom-cursor" ref="cursor"></div>
  <div class="ripple" ref="ripple"></div>
</template>

<script>
export default {
  name: "CustomCursor",
  data() {
    return {
      isAnimating: false // Variable pour suivre si une animation est en cours
    };
  },
  mounted() {
    window.addEventListener("mousemove", this.updateCursorPosition);
    window.addEventListener("mouseleave", this.hideCursor);
    window.addEventListener("mouseup", this.animateClick); // Changé de mousedown à mouseup
  },
  beforeUnmount() {
    window.removeEventListener("mousemove", this.updateCursorPosition);
    window.removeEventListener("mouseleave", this.hideCursor);
    window.removeEventListener("mouseup", this.animateClick); // Changé de mousedown à mouseup
  },
  methods: {
    updateCursorPosition(event) {
      const cursor = this.$refs.cursor;
      const ripple = this.$refs.ripple;

      // Revenir à l'utilisation de left et top pour le positionnement
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;

      // Utiliser transform uniquement pour l'échelle et le centrage
      cursor.style.transform = 'translate(-50%, -50%)';
      ripple.style.transform = 'translate(-50%, -50%)';

      cursor.style.opacity = 1; // Réaffiche le curseur si caché
    },
    hideCursor() {
      const cursor = this.$refs.cursor;
      cursor.style.opacity = 0; // Cache le curseur
    },
    animateClick() {
      // Éviter de lancer plusieurs animations en même temps
      if (this.isAnimating) return;

      this.isAnimating = true;
      const ripple = this.$refs.ripple;

      // Réinitialiser les classes avant d'ajouter la nouvelle animation
      ripple.classList.remove("ripple-animation");

      // Forcer un reflow pour réinitialiser l'animation
      void ripple.offsetWidth;

      ripple.classList.add("ripple-animation");
      setTimeout(() => {
        ripple.classList.remove("ripple-animation");
        this.isAnimating = false;
      }, 400); // Durée réduite de 0.6s à 0.4s
    },
  },
};
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  width: 15px;
  height: 15px;
  background-color: #ff9800;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  transition: opacity 0.3s ease, box-shadow 0.3s ease;
  z-index: 9999;
  box-shadow: 0 0 15px rgba(255, 152, 0, 0.9), 0 0 25px rgba(255, 152, 0, 0.5);
  animation: pulse 3s ease-in-out infinite; /* Durée augmentée et fonction de timing modifiée */
}

@keyframes pulse {
  0% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 15px rgba(255, 152, 0, 0.8), 0 0 25px rgba(255, 152, 0, 0.5);
  }
  25% {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.9), 0 0 30px rgba(255, 152, 0, 0.6);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    box-shadow: 0 0 25px rgba(255, 152, 0, 1), 0 0 40px rgba(255, 152, 0, 0.8);
  }
  75% {
    transform: translate(-50%, -50%) scale(1.15);
    box-shadow: 0 0 20px rgba(255, 152, 0, 0.9), 0 0 30px rgba(255, 152, 0, 0.6);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 15px rgba(255, 152, 0, 0.8), 0 0 25px rgba(255, 152, 0, 0.5);
  }
}

.ripple {
  position: fixed;
  width: 20px;
  height: 20px;
  background-color: rgba(255, 152, 0, 0.8);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  opacity: 0;
  z-index: 9998;
  animation: pulse 3s ease-in-out infinite; /* Applique les mêmes modifications à l'animation du ripple */
}

.ripple-animation {
  animation: rippleEffect 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards !important; /* !important pour remplacer l'animation pulse pendant l'effet de clic */
}

@keyframes rippleEffect {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translate(-50%, -50%) scale(5); /* Taille réduite de scale(8) à scale(5) */
    opacity: 0;
  }
}
</style>
