<script>

export default {
  name: 'VideoComponent',
  props: {
    videoSrc: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      default: ''
    }
  }
}

</script>

<template>
  <div class="video-component">
    <video width="640" height="360" controls muted preload="auto">
      <source :src="videoSrc" type="video/mp4" v-if="videoSrc.endsWith('.mp4')">
      <source :src="videoSrc" type="video/webm" v-else-if="videoSrc.endsWith('.webm')">
      <source :src="videoSrc" type="video/avi" v-else-if="videoSrc.endsWith('.avi')">
      <source :src="videoSrc" type="video/x-matroska" v-else-if="videoSrc.endsWith('.mkv')">
      <p v-else>Format de video inconnu</p>
      <p>Votre navigateur ne supporte pas la vidéo.</p>
    </video>
    <div v-if="caption" class="video-caption">{{ caption }}</div>
  </div>
</template>

<style>

.video-component{
  position: relative;
  max-width: min(800px, 92%);
  width: 100%;
  margin: 20px auto;

}

.video-component video{
  margin: 0 auto;
  width: auto;
  height: auto;
  max-height: 400px;
  max-width: min(800px, 92%);
  display: block;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #000; /* fallback */
}

.video-component video:hover{
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

.video-caption {
  margin: 4px auto 0 auto;
  width: 100%;
  max-width: min(800px, 92%);
  text-align: center;
  color: #ccc;
  font-size: 1rem;
  font-style: italic;
  padding: 0 10px;
  line-height: 1.4;
}


</style>