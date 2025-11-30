<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../../store.js';
import Clock from "./Clock.vue";
import UserProfile from "./UserProfile.vue";

const { locale } = useI18n();
const store = useStore();
const isLangMenuOpen = ref(false);
const isUserProfileOpen = ref(false);

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
</script>

<template>
  <div class="taskbar">
    <div class="user-section">
      <button class="user-profile" @click="openUserProfile">
        <span class="profile-icon">👤</span>
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
    </div>
  </div>

  <!-- User Profile Window -->
  <UserProfile v-if="isUserProfileOpen" @close="closeUserProfile" />
</template>

<style scoped>
.taskbar {
  background: linear-gradient(to top,
  rgba(15, 23, 42, 0.85),
  rgba(15, 23, 42, 0.6));
  backdrop-filter: blur(60px) saturate(200%);
  padding: 12px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 60px rgba(0, 0, 0, 0.4),
  inset 0 1px 0 rgba(255, 255, 255, 0.08),
  0 0 80px rgba(16, 185, 129, 0.05);
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
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.3px;
  margin-left: 2px;
}

.profile-icon {
  font-size: 20px;
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
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
}

.language-selector:hover .language-btn {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.language-menu {
  position: absolute;
  bottom: calc(100%);
  left: 50%;
  transform: translateX(-51%);
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 8px;
  min-width: 140px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  z-index: 10;
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
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.clock {
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.5px;
}

.user-profile {
  height: 45px;
  padding: 0 18px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.user-profile:hover {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08));
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.3);
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