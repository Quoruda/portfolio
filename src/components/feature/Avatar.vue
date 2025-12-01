<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ContactForm from './ContactForm.vue'

const { tm } = useI18n()

const emit = defineEmits(['presentation-complete'])

const isVisible = ref(false)
const isWaving = ref(false)
const currentMessageIndex = ref(0)
const isTyping = ref(false)
const displayedText = ref('')
const shouldShowBubble = ref(false)
const showContactForm = ref(false)
const isPresentationComplete = ref(false)

const messages = computed(() => tm('avatar.messages'))

onMounted(() => {
  // Apparition du robot après un court délai
  setTimeout(() => {
    isVisible.value = true
    // Animation de salut
    setTimeout(() => {
      isWaving.value = true
      setTimeout(() => {
        isWaving.value = false
        // Commencer les messages
        showNextMessage()
      }, 800)
    }, 600)
  }, 1000)
})

const showNextMessage = () => {
  if (currentMessageIndex.value >= messages.value.length) {
    // Fin des messages, Pixy devient cliquable
    setTimeout(() => {
      shouldShowBubble.value = false
      setTimeout(() => {
        isPresentationComplete.value = true
        emit('presentation-complete')
      }, 500)
    }, 3000)
    return
  }

  shouldShowBubble.value = true
  isTyping.value = true
  displayedText.value = ''

  const message = messages.value[currentMessageIndex.value]
  let charIndex = 0

  const typeInterval = setInterval(() => {
    if (charIndex < message.length) {
      displayedText.value += message[charIndex]
      charIndex++
    } else {
      clearInterval(typeInterval)
      isTyping.value = false

      // Attendre avant le prochain message
      setTimeout(() => {
        currentMessageIndex.value++
        showNextMessage()
      }, 2500)
    }
  }, 30)
}

const handleClick = () => {
  if (isPresentationComplete.value) {
    // Ouvrir le formulaire de contact
    isWaving.value = true
    setTimeout(() => {
      isWaving.value = false
      showContactForm.value = true
    }, 300)
  } else {
    // Animation simple pendant la présentation
    isWaving.value = true
    setTimeout(() => {
      isWaving.value = false
    }, 600)
  }
}

const closeContactForm = () => {
  showContactForm.value = false
}
</script>

<template>
  <!-- Formulaire de contact -->
  <Transition name="fade">
    <ContactForm v-if="showContactForm" @close="closeContactForm" />
  </Transition>

  <Transition name="avatar-slide">
    <div v-if="isVisible" class="avatar-container" :class="{ clickable: isPresentationComplete }" @click="handleClick">
      <!-- Bulle de dialogue -->
      <Transition name="bubble">
        <div v-if="shouldShowBubble" class="speech-bubble">
          <p>{{ displayedText }}<span v-if="isTyping" class="cursor">|</span></p>
        </div>
      </Transition>

      <!-- Robot Avatar -->
      <div class="robot" :class="{ waving: isWaving }">
        <img src="/avatar/pixy.png" alt="Assistant Robot" class="robot-image" />

        <!-- Effets lumineux -->
        <div class="glow-effect"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.avatar-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
}

/* Bulle de dialogue */
.speech-bubble {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 20px;
  position: relative;
  max-width: 300px;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.speech-bubble::before {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 25px;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid rgba(255, 255, 255, 0.2);
  filter: blur(0.5px);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 25px;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-top: 8px solid #764ba2;
}

.speech-bubble p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
}

.cursor {
  display: inline-block;
  animation: blink 0.8s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Robot */
.robot {
  position: relative;
  width: 200px;
  height: 200px;
  animation: float 3s ease-in-out infinite;
}

.robot-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 10px 25px rgba(102, 126, 234, 0.3));
  transition: transform 0.3s ease;
  transform: scaleX(-1);
}

.robot.waving .robot-image {
  animation: wave 0.6s ease-in-out;
}

@keyframes wave {
  0%, 100% { transform: scaleX(-1) rotate(0deg); }
  25% { transform: scaleX(-1) rotate(-15deg); }
  75% { transform: scaleX(-1) rotate(15deg); }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Effet lumineux autour du robot */
.glow-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}

/* Transitions */
.avatar-slide-enter-active {
  animation: slideInRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.avatar-slide-leave-active {
  animation: slideOutRight 0.5s ease-in-out;
}

@keyframes slideInRight {
  0% {
    transform: translateX(150px) translateY(50px);
    opacity: 0;
  }
  60% {
    transform: translateX(-10px) translateY(0);
  }
  100% {
    transform: translateX(0) translateY(0);
    opacity: 1;
  }
}

@keyframes slideOutRight {
  0% {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateX(150px) scale(0.8);
    opacity: 0;
  }
}

/* Avatar cliquable après présentation */
.avatar-container.clickable {
  cursor: pointer;
}

.avatar-container.clickable:hover .robot-image {
  transform: scaleX(-1) scale(1.05);
}

.avatar-container.clickable:hover .glow-effect {
  opacity: 1;
}

/* Animations bulles */
.bubble-enter-active {
  animation: bubbleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.bubble-leave-active {
  animation: bubbleOut 0.3s ease-in-out;
}

@keyframes bubbleIn {
  0% {
    transform: scale(0) translateY(20px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@keyframes bubbleOut {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}

/* Transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .avatar-container {
    bottom: 80px;
    left: 10px;
  }

  .speech-bubble {
    max-width: 250px;
    padding: 12px 16px;
    font-size: 13px;
  }

  .robot {
    width: 120px;
    height: 120px;
  }

  .glow-effect {
    width: 180px;
    height: 180px;
  }
}
</style>

