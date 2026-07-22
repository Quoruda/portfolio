<script setup>
import TaskBar from "./components/feature/TaskBar.vue";
import CustomCursor from "./components/feature/CustomCursor.vue";
import IconsContainer from "./components/base/IconsContainer.vue";
import Calculator from "./components/feature/Calculator.vue";
import Notes from "./components/feature/Notes.vue";
import Browser from "./components/feature/Browser.vue";
import BootScreen from "./components/feature/BootScreen.vue";
import {ref, nextTick, onMounted, onUnmounted} from "vue";
import LoginScreen from "./components/feature/LoginScreen.vue";
import Application from "./components/base/Application.vue";
import {useI18n} from "vue-i18n";
import ProjectManager from "./components/feature/ProjectManager.vue";

import { useStore } from './store.js';
import Avatar from "./components/feature/Avatar.vue";
const store = useStore()

const {t} = useI18n();

// 1. Créer la référence pour l'avatar
const avatarRef = ref(null);

const isLoginComplete = ref(false);

const handleLoginComplete = async () => {
  isLoginComplete.value = true;

  await nextTick();

  // 3. Lancer la présentation manuellement
  if (avatarRef.value) {
    if (store.pixyHasFinishedHisPresentation) {
      avatarRef.value.welcomeBack();
    } else {
      avatarRef.value.startPresentation();
    }

  }
};

// ─── Canvas Plasma Background ─────────────────────────────────
// Rendu à 240×135 (1/8 de 1920×1080) puis upscalé par le navigateur.
// L'interpolation bilinéaire du navigateur donne un rendu doux et fluide.
const bgCanvas = ref(null);
let animId = null;
let pt = 0; // plasma time (t est réservé par useI18n)

// Palette : stops de couleur du plus sombre au plus clair
// Base remontée, pic atténué → plage moins agressive
const palette = [
  [22,  48, 108],   // 0.0  : bleu nuit (moins noir)
  [18,  80, 160],   // 0.25 : bleu marine
  [15, 120, 205],   // 0.50 : bleu électrique
  [30, 165, 220],   // 0.70 : bleu ciel
  [60, 185, 215],   // 0.85 : bleu-teal doux
  [110, 200, 240],  // 1.0  : bleu ciel clair (pas éblouissant)
];

function lerpColor(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function samplePalette(u) {
  const n = palette.length - 1;
  const pos = u * n;
  const i = Math.min(Math.floor(pos), n - 1);
  return lerpColor(palette[i], palette[i + 1], pos - i);
}

function renderPlasma() {
  const canvas = bgCanvas.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width;   // 240
  const H = canvas.height;  // 135
  const img = ctx.createImageData(W, H);
  const d = img.data;

  for (let y = 0; y < H; y++) {
    const ny = y / H;
    for (let x = 0; x < W; x++) {
      const nx = x / W;

      // 5 ondes à fréquences plus élevées → variation partout sur l'écran
      const v1 = Math.sin(nx * 10.0 + pt * 0.6);
      const v2 = Math.sin(ny *  8.0 + pt * 0.45 + 1.4);
      const v3 = Math.sin((nx + ny) * 7.0 + pt * 0.5 + 2.1);
      // Vague circulaire centrée
      const v4 = Math.sin(
        Math.sqrt(((nx - 0.5) * (nx - 0.5) + (ny - 0.5) * (ny - 0.5)) * 28) +
        pt * 0.35
      );
      // 5e onde diagonale inverse
      const v5 = Math.sin((nx - ny) * 6.0 + pt * 0.4 + 3.7);

      const raw = (v1 + v2 + v3 + v4 + v5) / 5;
      const u = (raw + 1) / 2;

      // Petite touche de rose-chaud sur le bord bas-gauche
      const warmBias = Math.max(0, (1 - nx) * ny * 0.5);
      const rBias = warmBias * 80;
      const bBias = warmBias * -40;

      const [r, g, b] = samplePalette(u);
      const idx = (y * W + x) * 4;
      d[idx]     = Math.min(255, r + rBias);
      d[idx + 1] = g;
      d[idx + 2] = Math.max(0, b + bBias);
      d[idx + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  pt += 0.008;
  animId = requestAnimationFrame(renderPlasma);
}

onMounted(() => {
  requestAnimationFrame(renderPlasma);
});

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId);
});
// ───────────────────────────────────────────────────────
</script>

<template>
  <!-- Le fond est affiché dès le boot, même pendant le login -->
  <div class="os-background" v-if="store.hasBooted">
    <!-- Canvas plasma animé 240×135px upscalé en CSS -->
    <canvas ref="bgCanvas" class="bg-canvas" width="240" height="135"></canvas>
  </div>

  <div class="desktop" v-if="store.hasBooted" :hidden="!isLoginComplete">

    <IconsContainer>
      <ProjectManager/>
      <Notes/>
      <Calculator/>
      <Application icon="/icons/browser.png" :name="t('app.desktop.browser')">
        <Browser url="https://fr.wikipedia.org/wiki/Compression_de_données"/>
      </Application>
    </IconsContainer>

    <task-bar/>

    <!-- Ajout de la ref="avatarRef" ici -->
    <Avatar
        ref="avatarRef"
        v-if="isLoginComplete"
        @presentation-complete="store.finishPixyPresentation"
    />
  </div>

  <boot-screen v-if="! store.hasBooted" @boot-complete="store.boot"/>
  <login-screen @login-complete="handleLoginComplete"  v-if="store.hasBooted && ! isLoginComplete"/>
  <CustomCursor/>
</template>

<style scoped>
.os-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: #081245;
  overflow: hidden;
}

.desktop {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: transparent;
}

/* Canvas upscalé en position absolue pour couvrir tout le fond */
.bg-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  /* Pas de lissage pixelé : le navigateur fait la bilinear interpolation */
  image-rendering: auto;
}

</style>