<script setup>
import { ref } from "vue";
import Application from "../base/Application.vue";

const url = ref("https://www.wikipedia.com");
const inputUrl = ref(url.value);

function loadUrl() {
  let formatted = inputUrl.value.trim();
  if (!/^https?:\/\//i.test(formatted)) {
    formatted = "https://" + formatted;
  }
  url.value = formatted;
}
</script>

<template>
  <Application name="Browser" icon="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/GNOME_Web_logo_%282021-03%29.svg/2048px-GNOME_Web_logo_%282021-03%29.svg.png">
    <div class="browser">
      <div class="toolbar">
        <input
            v-model="inputUrl"
            @keyup.enter="loadUrl"
            type="text"
            placeholder="Enter a URL..."
        />
        <button @click="loadUrl">Go</button>
      </div>

      <iframe
          :src="url"
          frameborder="0"
          class="webview"
      ></iframe>
    </div>
  </Application>
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

.webview {
  flex: 1;
  width: 100%;
  border: none;
  border-radius: 0 0 16px 16px;
}
</style>
