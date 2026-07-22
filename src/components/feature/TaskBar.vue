<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../../store.js';
import Clock from "./Clock.vue";
import UserProfile from "./UserProfile.vue";

const { t, locale } = useI18n();
const store = useStore();
const isLangMenuOpen = ref(false);
const isPowerMenuOpen = ref(false);
const isUserProfileOpen = ref(false);

const emit = defineEmits(['restart', 'shutdown']);

const languages = [
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'en', flag: '🇬🇧', label: 'English' }
];

const currentLang = computed(() => {
  return locale.value.toUpperCase();
});

const toggleLangMenu = () => {
  isLangMenuOpen.value = !isLangMenuOpen.value;
};

const selectLanguage = (lang) => {
  locale.value = lang.code;
  localStorage.setItem('locale', lang.code);
  isLangMenuOpen.value = false;
};

const getCurrentFlag = () => {
  return languages.find(l => l.code === locale.value)?.flag || '🇬🇧';
};

const closeLangMenu = () => {
  isLangMenuOpen.value = false;
};

const openUserProfile = () => {
  isUserProfileOpen.value = true;
  store.markProfileAsClicked();
};

const closeUserProfile = () => {
  isUserProfileOpen.value = false;
};

const handleRestart = () => {
  isPowerMenuOpen.value = false;
  emit('restart');
};

const handleShutdown = () => {
  isPowerMenuOpen.value = false;
  emit('shutdown');
};
</script>

<template>
  <div class="taskbar">
    <div class="user-section">
      <button class="user-profile" @click="openUserProfile">
        <span class="profile-icon">
          <img src="/quoruda.png" alt="Quoruda" class="profile-avatar-img" />
        </span>
        <span class="user-name">Audrick S</span>
        <span v-if="!store.hasClickedProfile" class="notification-badge">!</span>
      </button>
    </div>

    <div class="system-tray">
      <div class="language-selector"
           @mouseenter="isLangMenuOpen = true"
           @mouseleave="isLangMenuOpen = false">
        <button class="language-btn">
          {{ getCurrentFlag() }} {{ currentLang }}
        </button>
        <div v-show="isLangMenuOpen" class="language-menu">
          <button
              v-for="lang in languages"
              :key="lang.code"
              class="language-option"
              :class="{ active: lang.code === locale }"
              @click="selectLanguage(lang)"
          >
            {{ lang.flag }} {{ lang.label }}
          </button>
        </div>
      </div>
      <div class="clock">
        <Clock/>
      </div>
      <div class="power-selector"
           @mouseenter="isPowerMenuOpen = true"
           @mouseleave="isPowerMenuOpen = false">
        <button class="power-btn" :title="t('app.power.shutdown')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
            <line x1="12" y1="2" x2="12" y2="12"></line>
          </svg>
        </button>
        <div v-show="isPowerMenuOpen" class="power-menu">
          <button class="power-option" @click="handleRestart">
            <span class="power-icon-sm">🔄</span> {{ t('app.power.restart') }}
          </button>
          <button class="power-option shutdown-opt" @click="handleShutdown">
            <span class="power-icon-sm">⏻</span> {{ t('app.power.shutdown') }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- User Profile Window -->
  <UserProfile v-if="isUserProfileOpen" @close="closeUserProfile" />
</template>

<style scoped>
.taskbar {
  background: rgba(15, 25, 45, 0.45);
  backdrop-filter: blur(48px) saturate(180%);
  -webkit-backdrop-filter: blur(48px) saturate(180%);
  padding: 10px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 12px 40px rgba(0, 0, 0, 0.4);
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 20px;
  width: calc(100% - 40px);
  max-width: 800px;
}

.user-section {
  display: flex;
  align-items: center;
}

.user-name {
  color: rgba(255, 255, 255, 0.95);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-left: 4px;
}

.profile-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}

.profile-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.system-tray {
  display: flex;
  align-items: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
}

.language-selector {
  position: relative;
}

.language-btn {
  background: transparent;
  border: none;
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.95);
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.language-selector:hover .language-btn {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
}

.language-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-51%);
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.10) 0%,
    rgba(20, 30, 90, 0.45) 40%,
    rgba(10, 18, 60, 0.55) 100%
  );
  backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  -webkit-backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  padding: 8px;
  min-width: 140px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
  z-index: 10;
}

/* Pont invisible pour garder le hover actif pendant qu'on passe la souris sur l'espace vide */
.language-menu::after {
  content: '';
  position: absolute;
  top: 100%;
  left: -20px;
  right: -20px;
  height: 20px;
}

.language-option {
  width: 100%;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
}

.language-option:hover {
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 1);
}

.language-option.active {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 1);
}

.clock {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}

.power-selector {
  position: relative;
  display: flex;
  align-items: center;
}

.power-btn {
  background: transparent;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.85);
  padding: 6px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.power-selector:hover .power-btn {
  background: rgba(239, 68, 68, 0.25);
  color: #fca5a5;
  transform: translateY(-1px);
}

.power-menu {
  position: absolute;
  bottom: calc(100% + 8px);
  right: 0;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.10) 0%,
    rgba(20, 30, 90, 0.55) 40%,
    rgba(10, 18, 60, 0.65) 100%
  );
  backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  -webkit-backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 14px;
  padding: 8px;
  min-width: 190px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.1) inset;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.power-menu::after {
  content: '';
  position: absolute;
  top: 100%;
  left: -20px;
  right: -20px;
  height: 20px;
}

.power-option {
  width: 100%;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  text-align: left;
  font-size: 13px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.power-option:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #ffffff;
}

.power-option.shutdown-opt:hover {
  background: rgba(239, 68, 68, 0.25);
  color: #fca5a5;
}

.power-icon-sm {
  font-size: 14px;
  display: inline-flex;
}

.user-profile {
  background: transparent;
  border: none;
  padding: 6px 12px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s ease;
  position: relative;
  outline: none;
}

.user-profile:hover {
  background: rgba(255, 255, 255, 0.1);
}

@keyframes notificationPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); box-shadow: 0 2px 12px rgba(239, 68, 68, 0.8); }
}

.notification-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: 2px solid rgba(15, 23, 42, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 600;
  color: white;
  animation: notificationPulse 2s ease-in-out infinite;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.5);
}
</style>