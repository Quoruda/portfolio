<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)
const password = ref('')
const isTyping = ref(false)
const isLoggingIn = ref(false)

const emit = defineEmits(['login-complete'])

onMounted(() => {
  // Attendre que le boot screen disparaisse
  setTimeout(() => {
    isVisible.value = true
    startAutoType()
  }, 100)
})

const startAutoType = () => {
  setTimeout(() => {
    isTyping.value = true
    const mockPassword = '••••••••'
    let index = 0

    const typeInterval = setInterval(() => {
      if (index < mockPassword.length) {
        password.value += mockPassword[index]
        index++
      } else {
        clearInterval(typeInterval)
        isTyping.value = false
        setTimeout(() => {
          login()
        }, 300)
      }
    }, 100)
  }, 500)
}

const login = () => {
  isLoggingIn.value = true
  setTimeout(() => {
    isVisible.value = false
    setTimeout(() => {
      emit('login-complete')
    }, 300)
  }, 400)
}
</script>

<template>
  <Transition name="fade">
    <div v-if="isVisible" class="login-screen">


      <div class="login-container" :class="{ 'logging-in': isLoggingIn }">
        <div class="user-avatar">
          <div class="avatar-circle">
            <img src="/quoruda.png" alt="Quoruda" class="avatar-img" />
          </div>
        </div>

        <div class="user-name">Audrick</div>

        <div class="password-container">
          <div class="password-input" :class="{ 'typing': isTyping }">
            <input
                type="password"
                :value="password"
                readonly
                placeholder="Mot de passe"
            />
            <div class="typing-cursor" v-if="isTyping"></div>
          </div>
        </div>

        <div class="login-status" v-if="isLoggingIn">
          <div class="status-spinner"></div>
          <span>Connexion en cours...</span>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.login-screen {
  position: fixed;
  inset: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}

.login-container {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  padding: 48px;
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.10) 0%,
    rgba(20, 30, 90, 0.45) 40%,
    rgba(10, 18, 60, 0.55) 100%
  );
  backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  -webkit-backdrop-filter: blur(32px) saturate(160%) brightness(0.95);
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-bottom-color: rgba(255, 255, 255, 0.06);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.45),
    0 1px 0 rgba(255, 255, 255, 0.14) inset;
  min-width: 400px;
  transition: all 0.3s ease;
}

.login-container.logging-in {
  transform: scale(0.98);
  opacity: 0.8;
}

.user-avatar {
  margin-bottom: 8px;
}

.avatar-circle {
  width: 100px;
  height: 100px;
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-size: 28px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 0.5px;
}

.password-container {
  width: 100%;
  margin-top: 8px;
}

.password-input {
  position: relative;
  width: 100%;
}

.password-input input {
  width: 100%;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
  letter-spacing: 2px;
}

.password-input.typing input {
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.password-input input::placeholder {
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: normal;
}

.typing-cursor {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 20px;
  background: #3b82f6;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.login-status {
  display: flex;
  align-items: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-top: 8px;
}

.status-spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}


@media (max-width: 768px) {
  .login-container {
    min-width: 320px;
    padding: 36px 24px;
  }

  .avatar-circle {
    width: 80px;
    height: 80px;
  }

  .avatar-icon {
    font-size: 38px;
  }

  .user-name {
    font-size: 24px;
  }
}
</style>