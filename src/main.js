import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { ParticlesComponent } from "vue3-particles"

const app = createApp(App)
app.use(router);
app.component('ParticlesBackground', ParticlesComponent)
app.mount('#app')
