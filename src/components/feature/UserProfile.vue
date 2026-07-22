<script setup>
import Window from '../base/Window.vue';
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, tm } = useI18n();

const emit = defineEmits(['close']);

const closeProfile = () => {
  emit('close');
};

const isImageUrl = (icon) => {
  if (!icon) return false;
  return icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('./') ||
      icon.includes('.png') || icon.includes('.jpg') || icon.includes('.svg') || icon.includes('.webp');
};

const isAltName = ref(false);
const isGlitching = ref(false);

const displayName = computed(() => {
  return isAltName.value ? t('profile.altName') : t('profile.name');
});

setInterval(() => {
  isGlitching.value = true;
  setTimeout(() => {
    isAltName.value = !isAltName.value;
    isGlitching.value = false;
  }, 300);
}, 2500);

const userInfo = computed(() => ({
  name: t('profile.name'),
  role: t('profile.role'),
  location: t('profile.location'),
  email: 'audrick.soltner@edu.univ-fcomte.fr',
  github: 'github.com/Quoruda',
  portfolio: '🌐 asoltner-portfolio.fr',
  shortBio: t('profile.shortBio'),
  skills: [
    {
      category: t('profile.skills.categories.frontend'),
      items: [
        { name: 'Vue.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
        { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'HTML/CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' }
      ]
    },
    {
      category: t('profile.skills.categories.backend'),
      items: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'PHP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' }
      ]
    },
    {
      category: t('profile.skills.categories.data'),
      items: [
        { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
        { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
        { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      category: t('profile.skills.categories.tools'),
      items: [
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
        { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
        { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
        { name: 'Godot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/godot/godot-original.svg' },
        { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg' }
      ]
    },
    {
      category: t('profile.skills.categories.ai'),
      items: [
        { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
        { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' }
      ]
    },
    {
      category: t('profile.skills.categories.graphics'),
      items: [
        { name: 'OpenGL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opengl/opengl-original.svg' }
      ]
    }
  ],
  softSkills: [
    { name: t('profile.softSkills.items.teamwork'), icon: '🤝' },
    { name: t('profile.softSkills.items.problemSolving'), icon: '🧩' },
    { name: t('profile.softSkills.items.creativity'), icon: '💡' },
    { name: t('profile.softSkills.items.adaptability'), icon: '🔄' },
    { name: t('profile.softSkills.items.autonomy'), icon: '🎯' },
    { name: t('profile.softSkills.items.curiosity'), icon: '🔍' },
    { name: t('profile.softSkills.items.rigor'), icon: '📐' }
  ]
}));</script>

<template>
  <Window :name="t('profile.title')" icon="👤" @close="closeProfile">
    <div class="profile-container">
      <!-- Header -->
      <div class="profile-header">
        <div class="avatar">
          <img src="/quoruda.png" alt="Quoruda" class="avatar-img" />
        </div>
        <div class="header-info">
          <h1 class="profile-name" :class="{ glitch: isGlitching }">{{ displayName }}</h1>
          <p class="profile-role">{{ userInfo.role }}</p>
          <p class="profile-bio">{{ userInfo.shortBio }}</p>
          <a href="/audrick_soltner_cv.pdf" download="Audrick_Soltner_CV.pdf" class="cv-button">
            {{ t('profile.downloadCV') }}
          </a>
        </div>
      </div>

      <!-- Contact rapide -->
      <div class="contact-section">
        <div class="contact-item">
          <span>📍 {{ userInfo.location }}</span>
        </div>
        <div class="contact-item">
          ✉️ <a href="mailto:audrick.soltner@edu.univ-fcomte.fr">{{ userInfo.email }}</a>
        </div>
        <div class="contact-item">
          📂 <a href="https://github.com/Quoruda" target="_blank" rel="noopener noreferrer">{{ userInfo.github }}</a>
        </div>
        <div class="contact-item">
          <a href="https://asoltner-portfolio.fr" target="_blank" rel="noopener noreferrer">{{ userInfo.portfolio }}</a>
        </div>
      </div>

      <!-- Formation -->
      <div class="education-section">
        <h2 class="section-title">{{ t('profile.education.title') }}</h2>
        <div class="education-items">
          <div v-for="(edu, index) in tm('profile.education.items')" :key="index" class="education-item">
            <div class="education-header">
              <span class="education-period">{{ edu.period }}</span>
              <h3 class="education-degree">{{ edu.degree }}</h3>
            </div>
            <p class="education-school">{{ edu.school }} • {{ edu.location }}</p>
            <p class="education-description">{{ edu.description }}</p>
          </div>
        </div>
      </div>

      <!-- Veille Technologique -->
      <div class="tech-watch-section">
        <h2 class="section-title">{{ t('profile.techWatch.title') }}</h2>
        <p class="tech-watch-description">{{ t('profile.techWatch.description') }}</p>
        <div class="tech-watch-sources">
          <div v-for="(source, index) in tm('profile.techWatch.sources')" :key="index" class="source-card">
            <span class="source-icon">{{ typeof source === 'object' ? (source.icon || '📚') : '📚' }}</span>
            <div class="source-details">
              <h4 class="source-title">{{ typeof source === 'object' ? source.title : source }}</h4>
              <p v-if="typeof source === 'object' && source.description" class="source-description">{{ source.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Soft Skills -->
      <div class="soft-skills-section">
        <h2 class="section-title">{{ t('profile.softSkills.title') }}</h2>
        <div class="soft-skills-grid">
          <span v-for="skill in userInfo.softSkills" :key="skill.name" class="soft-skill-tag">
            <span class="soft-skill-icon">{{ skill.icon }}</span>
            <span class="soft-skill-name">{{ skill.name }}</span>
          </span>
        </div>
      </div>

      <!-- Compétences Techniques -->
      <div class="skills-section">
        <h2 class="section-title">{{ t('profile.skills.title') }}</h2>
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
  background: rgba(255, 255, 255, 0.05);
  border: 3px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.header-info {
  flex: 1;
  position: relative;
  isolation: isolate;
}

.profile-name {
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 4px 0;
  filter: drop-shadow(0 2px 10px rgba(0, 0, 0, 0.9));
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
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 8px 0;
  font-weight: 600;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
}

.profile-bio {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  line-height: 1.5;
}

.cv-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  padding: 8px 18px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cv-button:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* Contact section */
.contact-section {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.contact-item {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.contact-item a {
  color: white;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-item a:hover {
  color: #ffffff;
  text-decoration: underline;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.skills-section, .education-section, .tech-watch-section, .soft-skills-section {
  padding: 0;
  margin-bottom: 16px;
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
  font-size: 16px;
  font-weight: 600;
  color: white;
  margin: 0;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
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
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
}

.skill-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: drop-shadow(0 0 4px rgba(59, 130, 246, 0.5));
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
}

.skill-name {
  line-height: 1;
}

.skill-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.skill-tag:hover .skill-icon {
  transform: scale(1.2) rotate(5deg);
}

/* Education section */
.education-items {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.education-item {
  background: transparent;
  padding: 0 0 0 16px;
  border-radius: 0;
  border-left: 3px solid rgba(255, 255, 255, 0.4);
  transition: all 0.3s ease;
}

.education-item:hover {
  border-left-color: rgba(255, 255, 255, 0.8);
  transform: translateX(4px);
}

.education-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.education-degree {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.education-period {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 600;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 3px 10px;
  border-radius: 12px;
  white-space: nowrap;
}

.education-school {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 8px 0;
  font-weight: 500;
}

.education-description {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
}

/* Tech Watch section */

.tech-watch-description {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 16px 0;
  line-height: 1.6;
}

.tech-watch-sources {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.source-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 14px 16px;
  transition: all 0.3s ease;
}

.source-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.18);
  transform: translateX(4px);
}

.source-icon {
  font-size: 22px;
  line-height: 1;
  flex-shrink: 0;
  margin-top: 2px;
}

.source-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.source-title {
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
}

.source-description {
  font-size: 13.5px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

/* Soft Skills section */

.soft-skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.soft-skill-tag {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: default;
  display: flex;
  align-items: center;
  gap: 10px;
}

.soft-skill-icon {
  font-size: 18px;
  filter: drop-shadow(0 0 4px rgba(236, 72, 153, 0.5));
  transition: transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: translateZ(0);
  will-change: transform;
}

.soft-skill-name {
  line-height: 1;
}

.soft-skill-tag:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.soft-skill-tag:hover .soft-skill-icon {
  transform: scale(1.2) rotate(-5deg);
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