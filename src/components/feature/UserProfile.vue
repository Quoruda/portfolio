<script setup>
import Window from '../base/Window.vue';
import { ref } from 'vue';

const emit = defineEmits(['close']);

const closeProfile = () => {
  emit('close');
};

const isImageUrl = (icon) => {
  if (!icon) return false;
  return icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./') ||
      icon.includes('.png') || icon.includes('.jpg') || icon.includes('.svg') || icon.includes('.webp');
};

const displayName = ref('Audrick Soltner');
const isGlitching = ref(false);

setInterval(() => {
  isGlitching.value = true;
  setTimeout(() => {
    displayName.value = displayName.value === 'Audrick Soltner' ? 'Quoruda' : 'Audrick Soltner';
    isGlitching.value = false;
  }, 300);
}, 2000);

const userInfo = {
  name: 'Audrick Soltner',
  role: 'Développeur Full Stack',
  location: '📍 Valdoie, France',
  email: '📧 audrick.soltner@edu.univ-fcomte.fr',
  github: '🐙 github.com/Quoruda',
  portfolio: '🌐 asoltner-portfolio.fr',
  shortBio: 'Développeur passionné par la technologie et l\'innovation. Spécialisé en développement web et applications, avec un intérêt particulier pour l\'IA et l\'algorithmique.',
  skills: [
    {
      category: '💻 Frontend',
      items: [
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
      ]
    },
    {
      category: '⚙️ Backend',
      items: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' }
      ]
    },
    {
      category: '🗄️ Données',
      items: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      category: '🛠️ Outils',
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Godot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg' },
        { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' }
      ]
    },
    {
      category: '🤖 IA/ML',
      items: [
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' }
      ]
    },
    {
      category: '🎮 Graphique',
      items: [
        { name: 'OpenGL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg' }
      ]
    }
  ]
};
</script>

<template>
  <Window name="À propos" icon="👤" @close="closeProfile">
    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <div class="avatar">
          <span class="avatar-icon">👨‍💻</span>
        </div>
        <div class="header-info">
          <h1 class="profile-name" :class="{ glitch: isGlitching }">{{ displayName }}</h1>
          <p class="profile-role">{{ userInfo.role }}</p>
          <p class="profile-bio">{{ userInfo.shortBio }}</p>
        </div>
      </div>

      <!-- Contact rapide -->
      <div class="contact-section">
        <div class="contact-item">
          <span>{{ userInfo.location }}</span>
        </div>
        <div class="contact-item">
          <a href="mailto:audrick.soltner@edu.univ-fcomte.fr">{{ userInfo.email }}</a>
        </div>
        <div class="contact-item">
          <a href="https://github.com/Quoruda" target="_blank">{{ userInfo.github }}</a>
        </div>
        <div class="contact-item">
          <a href="https://asoltner-portfolio.fr" target="_blank">{{ userInfo.portfolio }}</a>
        </div>
      </div>

      <!-- Compétences -->
      <div class="skills-section">
        <h2 class="section-title">🛠️ Compétences</h2>
        <div class="skills-grid">
          <div v-for="skillGroup in userInfo.skills" :key="skillGroup.category" class="skill-group">
            <h3 class="skill-category">{{ skillGroup.category }}</h3>
            <div class="skill-tags">
              <span v-for="skill in skillGroup.items" :key="skill.name" class="skill-tag">
                <span class="skill-icon">
                  <img v-if="isImageUrl(skill.icon)" :src="skill.icon" :alt="skill.name" class="skill-icon-img" />
                  <template v-else>{{ skill.icon }}</template>
                </span>
                <span class="skill-name">{{ skill.name }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Window>
</template>

<style scoped>
.profile-container {
  height: 100%;
  overflow-y: auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  isolation: isolate;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3));
  border: 3px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.avatar-icon {
  font-size: 48px;
  filter: drop-shadow(0 0 8px rgba(59, 130, 246, 0.5));
}

.header-info {
  flex: 1;
  position: relative;
  isolation: isolate;
}

.profile-name {
  font-size: 32px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 4px 0;
  background: linear-gradient(135deg, #3b82f6, #10b981);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-height: 40px;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  display: inline-block;
  position: relative;
  will-change: transform;
  isolation: isolate;
}

.profile-name.glitch {
  animation: glitch 0.3s steps(2, end);
}

@keyframes glitch {
  0% {
    text-shadow:
        -2px 0 #ff00de,
        2px 0 #00ffff,
        0 0 8px rgba(255, 0, 222, 0.8);
    transform: translate(-2px, -2px);
  }
  25% {
    text-shadow:
        2px 0 #ff00de,
        -2px 0 #00ffff,
        0 0 8px rgba(0, 255, 255, 0.8);
    transform: translate(2px, 2px);
  }
  50% {
    text-shadow:
        -2px 0 #00ffff,
        2px 0 #ff00de,
        0 0 8px rgba(255, 0, 222, 0.8);
    transform: translate(0, -2px);
  }
  75% {
    text-shadow:
        2px 0 #00ffff,
        -2px 0 #ff00de,
        0 0 8px rgba(0, 255, 255, 0.8);
    transform: translate(-2px, 2px);
  }
  100% {
    text-shadow: none;
    transform: translate(0);
  }
}

.profile-role {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 8px 0;
  font-weight: 500;
}

.profile-bio {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
}

/* Contact section */
.contact-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.contact-item {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.85);
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  transition: all 0.3s ease;
}

.contact-item a {
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: rgba(59, 130, 246, 0.9);
}

.contact-item:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
}

/* Skills section */
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.skills-section {
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.skills-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skill-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skill-category {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(16, 185, 129, 0.2));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: default;
  display: flex;
  align-items: center;
  gap: 8px;
}

.skill-icon {
  font-size: 16px;
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
}

.skill-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
}

.skill-name {
  line-height: 1;
}

.skill-tag:hover {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(16, 185, 129, 0.3));
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.skill-tag:hover .skill-icon {
  transform: scale(1.2) rotate(5deg);
}

/* Scrollbar */
.profile-container::-webkit-scrollbar {
  width: 8px;
}

.profile-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.profile-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.profile-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .profile-container {
    padding: 20px;
    gap: 20px;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .avatar-icon {
    font-size: 40px;
  }

  .profile-name {
    font-size: 24px;
  }

  .profile-role {
    font-size: 16px;
  }

  .contact-section {
    justify-content: center;
  }

  .profile-bio {
    font-size: 13px;
  }
}
</style>