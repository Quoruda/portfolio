import { createApp } from 'vue';
import App from './App.vue';
//import router from './router';
import { ParticlesComponent } from "vue3-particles"  // Commenté temporairement
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Choisissez un thème

const app = createApp(App)
//app.use(router);
app.component('ParticlesBackground', ParticlesComponent)  // Commenté temporairement
app.mount('#app')

document.querySelectorAll('pre code').forEach((block) => {
  hljs.highlightElement(block);
});
