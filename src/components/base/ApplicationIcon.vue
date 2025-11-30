<script setup>
defineProps({
  icon: String,
  name: String
})

const isUrl = (value) => {
  return value.startsWith('http') || value.startsWith('/') || value.startsWith('./');
};
</script>

<template>
  <div class="icon" @click="$emit('click')">
    <div class="icon-image" v-if="isUrl(icon)">
      <img :src="icon" alt="icon" class="icon-img url-icon" />
    </div>
    <div class="icon-image" v-else>{{icon}}</div>
    <div class="icon-label">{{name}}</div>
  </div>
</template>

<style scoped>
.icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  border-radius: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  position: relative;
}

.icon::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.05);
  opacity: 0;
  transition: opacity 0.3s;
}

.icon:hover::before {
  opacity: 1;
}

.icon:hover {
  transform: translateY(-5px);
}

.icon:active {
  transform: translateY(-2px) scale(0.98);
}

.icon-image {
  width: 90px;
  height: 90px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 16px;
  box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.icon:hover .icon-image {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  box-shadow:
      0 12px 48px rgba(0, 0, 0, 0.3),
      inset 0 1px 2px rgba(255, 255, 255, 0.15);
  transform: translateY(-3px);
}

.icon-label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  /* Limite la largeur pour forcer le passage sur plusieurs lignes */
  max-width: 90px; /* correspond à la largeur .icon-image */
  width: 100%;

  /* Autorise le wrapping et coupe proprement après 2 lignes */
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* nombre de lignes visibles */
  -webkit-box-orient: vertical;

  /* Sécurité pour les mots très longs / URLs */
  word-break: break-word;
  hyphens: auto;
}

.icon-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 28px;
}

.icon-img.url-icon {
  padding: 10px;
  border-radius: 24px;
}
</style>