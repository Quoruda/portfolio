<script setup>
import TaskBar from "./components/feature/TaskBar.vue";
import CustomCursor from "./components/feature/CustomCursor.vue";
import IconsContainer from "./components/base/IconsContainer.vue";
import Calculator from "./components/feature/Calculator.vue";
import Notes from "./components/feature/Notes.vue";
import Browser from "./components/feature/Browser.vue";
import BootScreen from "./components/feature/BootScreen.vue";
import {ref} from "vue";
import LoginScreen from "./components/feature/LoginScreen.vue";
import MarkdownReader from "./components/base/MarkdownReader.vue";
import Folder from "./components/base/Folder.vue";
import ProjectManager from "./components/feature/ProjectManager.vue";
import Application from "./components/base/Application.vue";

const isBootComplete = ref(false);
const handleBootComplete = () => {
  isBootComplete.value = true;
};

const isLoginComplete = ref(false);
const handleLoginComplete = () => {
  isLoginComplete.value = true;
};



</script>

<template>
  <div class="desktop" v-if="isBootComplete">
    <div class="background-pattern">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-4"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>

    <IconsContainer>
      <ProjectManager/>
      <Notes/>
      <Calculator/>
      <Application icon="/icons/browser.png" name="Browser">
        <Browser url="https://fr.wikipedia.org/wiki/Compression_de_données"/>
      </Application>
    </IconsContainer>

    <task-bar/>

  </div>

  <boot-screen v-if="! isBootComplete" @boot-complete="handleBootComplete"/>
  <login-screen @login-complete="handleLoginComplete"  v-if="isBootComplete && ! isLoginComplete"/>
  <CustomCursor/>
</template>

<style scoped>
.desktop {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #0a0e27;
}

.background-pattern {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* Formes géométriques nettes */
.shape {
  position: absolute;
  opacity: 0.15;
}

.shape-1 {
  width: 600px;
  height: 600px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  top: -200px;
  right: -150px;
  animation: float 20s ease-in-out infinite;
}

.shape-2 {
  width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
  border-radius: 63% 37% 54% 46% / 55% 48% 52% 45%;
  bottom: -100px;
  left: -100px;
  animation: float 15s ease-in-out infinite reverse;
}

.shape-4 {
  width: 500px;
  height: 500px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  border-radius: 50%;
  top: 20%;
  left: 15%;
  opacity: 0.1;
  animation: pulse 10s ease-in-out infinite;
}

/* Effets de lumière */
.glow {
  position: absolute;
  filter: blur(100px);
  opacity: 0.3;
  animation: glow 8s ease-in-out infinite;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #3b82f6 0%, transparent 70%);
  top: 10%;
  right: 20%;
  animation-delay: 0s;
}

.glow-2 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, #8b5cf6 0%, transparent 70%);
  bottom: 15%;
  left: 25%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-30px) rotate(5deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.15;
  }
}

@keyframes glow {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}
</style>