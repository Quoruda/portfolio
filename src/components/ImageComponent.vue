<script>

export default {
  name: 'ImageComponent',
  props:{
    src:{
      type: String,
      required: true
    },
    alt:{
      type: String,
      required: true
    }
  },

}


</script>

<template>

  <div class="image-component">
    <img :src="src" :alt="alt" />
  </div>

</template>

<style scoped>

.image-component{
  width: 100%;
  height: auto;
  max-width: min(800px, 92%);
  max-height: 400px;
  display: block;
  margin: 15px auto;
}

.image-component img{
  width: auto;
  height: auto;
  max-width: min(800px, 92%);
  max-height: 400px;
  display: block;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  object-fit: contain;
  margin: 0 auto;
}

.image-component img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

</style>