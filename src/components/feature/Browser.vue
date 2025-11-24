<script setup>
import { ref } from "vue";
import Application from "../base/Application.vue";
import Window from "../base/Window.vue";

const props = defineProps({
  defaultURL : {
    type: String,
    default: "https://www.wikipedia.com"
  },
  url_is_viewable: {
    type: Boolean,
    default: true
  }
});

const url = ref(props.defaultURL);
const inputUrl = ref(url.value);
const isLoading = ref(true);
const isMouseOverIframe = ref(false);

function loadUrl() {
  let formatted = inputUrl.value.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = "https://" + formatted;
  }
  isLoading.value = true;
  url.value = formatted;
}

function onIframeLoad() {
  isLoading.value = false;
}

function onIframeMouseEnter() {
  isMouseOverIframe.value = true;
  // Masquer le curseur custom
  document.body.classList.add('hide-custom-cursor');
}

function onIframeMouseLeave() {
  isMouseOverIframe.value = false;
  // Réafficher le curseur custom
  document.body.classList.remove('hide-custom-cursor');
}
</script>

<template>
    <div class="browser">
      <div class="toolbar" v-if="url_is_viewable">
        <input
            v-model="inputUrl"
            @keyup.enter="loadUrl"
            type="text"
            placeholder="Enter a URL..."
        />
        <button @click="loadUrl">Go</button>
      </div>

      <div
          class="content-wrapper"
          @mouseenter="onIframeMouseEnter"
          @mouseleave="onIframeMouseLeave"
      >
        <div v-if="isLoading" class="loading-spinner">
          <div class="spinner"></div>
        </div>
        <iframe
            :src="url"
            class="webview"
            @load="onIframeLoad"
        ></iframe>
      </div>
    </div>
</template>

<style scoped>
.browser {
  display: flex;
  flex-direction: column;
  height: 100%;

}

.toolbar {
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem;
  background: #f3f3f3;
  border-bottom: 1px solid #ccc;
}

.toolbar input {
  flex: 1;
  padding: 0.4rem;
  border: 1px solid #aaa;
  border-radius: 4px;
}

.toolbar button {
  padding: 0.4rem 1rem;
  border: none;
  background: #0078d4;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.content-wrapper {
  position: relative;
  flex: 1;
  width: 100%;
}

.loading-spinner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  z-index: 10;
  border-radius: 0 0 16px 16px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #0078d4;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.webview {
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0 0 16px 16px;
}
</style>
