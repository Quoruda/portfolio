<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import ContactForm from './ContactForm.vue'

const props = defineProps({
  initialMood: {
    type: String,
    default: 'idle',
    validator: (value) => ['idle', 'excited', 'sleeping', 'contact'].includes(value)
  },
  skipIntro: {
    type: Boolean,
    default: false
  }
})

// Ajout de 't' pour les traductions simples
const { tm, t } = useI18n()
const emit = defineEmits(['presentation-complete', 'interaction'])

// --- États Réactifs ---
const isVisible = ref(false)
const isWaving = ref(false)
const currentMood = ref(props.initialMood)
const isTyping = ref(false)
const displayedText = ref('')
const shouldShowBubble = ref(false)
const showContactForm = ref(false)
const isPresentationComplete = ref(false)

const defaultMessages = computed(() => tm('avatar.messages') || [])

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// --- API Publique ---

const say = async (text, duration = 3000) => {
  isTyping.value = false
  shouldShowBubble.value = true
  displayedText.value = ''

  if (currentMood.value === 'sleeping') {
    currentMood.value = 'idle'
    await wait(300)
  }

  isTyping.value = true

  const targetText = text
  for (let i = 0; i < text.length; i++) {
    if (targetText !== text) return
    displayedText.value += text[i]
    await wait(30)
  }

  isTyping.value = false

  if (duration > 0) {
    await wait(duration)
    if (displayedText.value === text) {
      shouldShowBubble.value = false
    }
  }
}

const wave = async () => {
  if (isWaving.value) return
  isWaving.value = true
  await wait(800)
  isWaving.value = false
}

const setMood = (newMood) => {
  currentMood.value = newMood
}

const openContact = () => {
  currentMood.value = 'contact'
  showContactForm.value = true
}

const startPresentation = async () => {
  if (isPresentationComplete.value && !props.skipIntro) return

  await wave()

  if (defaultMessages.value && defaultMessages.value.length > 0) {
    for (const msg of defaultMessages.value) {
      await say(msg, 2000)
      await wait(500)
    }
  }

  shouldShowBubble.value = false
  await wait(500)
  isPresentationComplete.value = true
  emit('presentation-complete')
}

/**
 * Action : Accueille l'utilisateur qui revient
 */
const welcomeBack = async () => {
  // On marque la présentation comme faite pour débloquer les clics
  isPresentationComplete.value = true

  await wave()
  const message = t('avatar.welcomeBack')
  await say(message, 4000)
}

defineExpose({
  say,
  wave,
  setMood,
  openContact,
  startPresentation,
  welcomeBack, // Nouvelle méthode exposée
  currentMood
})

// --- Logique Interne ---

onMounted(async () => {
  await wait(1000)
  isVisible.value = true

  if (props.skipIntro) {
    isPresentationComplete.value = true
  }
})

const handleInteraction = async () => {
  emit('interaction')

  if (showContactForm.value) return

  if (!isPresentationComplete.value) {
    wave()
  } else {
    await wave()
    openContact()
  }
}

const closeContactForm = () => {
  showContactForm.value = false
  currentMood.value = 'idle'
}
</script>

<template>
  <Transition name="fade">
    <ContactForm v-if="showContactForm" @close="closeContactForm" />
  </Transition>

  <Transition name="avatar-slide">
    <div
        v-if="isVisible"
        class="avatar-wrapper"
        :class="[currentMood, { clickable: isPresentationComplete }]"
        @click="handleInteraction"
        @keydown.enter="handleInteraction"
        role="button"
        tabindex="0"
        aria-label="Assistant virtuel"
    >
      <Transition name="bubble">
        <div v-if="shouldShowBubble" class="speech-bubble">
          <p>{{ displayedText }}<span v-if="isTyping" class="cursor">|</span></p>
        </div>
      </Transition>

      <div class="robot-container">
        <div class="robot" :class="{ waving: isWaving }">
          <img src="/avatar/pixy.png" alt="" aria-hidden="true" class="robot-image" />
        </div>
        <div class="glow-effect"></div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.avatar-wrapper {
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 15px;
  outline: none;
  transition: transform 0.3s ease;
}

/* MOODS */
.avatar-wrapper.idle .robot { animation: float 4s ease-in-out infinite; }
.avatar-wrapper.idle .glow-effect { background: radial-gradient(circle, rgba(102, 126, 234, 0.4) 0%, transparent 70%); }

.avatar-wrapper.excited .robot { animation: float 1.5s ease-in-out infinite; }
.avatar-wrapper.excited .glow-effect {
  background: radial-gradient(circle, rgba(255, 200, 50, 0.5) 0%, transparent 70%);
  animation: pulse 1s ease-in-out infinite;
}

.avatar-wrapper.sleeping .robot {
  animation: float 6s ease-in-out infinite;
  opacity: 0.8;
  filter: grayscale(30%);
}
.avatar-wrapper.sleeping .glow-effect {
  background: radial-gradient(circle, rgba(120, 50, 200, 0.3) 0%, transparent 70%);
  width: 200px; height: 200px;
}

.avatar-wrapper.contact .robot { transform: scale(0.8); }

/* BULLE */
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
  min-height: 40px;
}

.speech-bubble::before {
  content: '';
  position: absolute; bottom: -8px; left: 25px; width: 0; height: 0;
  border-left: 10px solid transparent; border-right: 10px solid transparent;
  border-top: 10px solid rgba(255, 255, 255, 0.2); filter: blur(0.5px);
}

.speech-bubble::after {
  content: '';
  position: absolute; bottom: -6px; left: 25px; width: 0; height: 0;
  border-left: 9px solid transparent; border-right: 9px solid transparent;
  border-top: 8px solid #764ba2;
}

.speech-bubble p { margin: 0; font-size: 14px; line-height: 1.4; font-weight: 500; }

.cursor { display: inline-block; animation: blink 0.8s infinite; margin-left: 2px; font-weight: bold; }
@keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }

/* ROBOT */
.robot-container { position: relative; width: 200px; height: 200px; }
.robot { position: relative; width: 100%; height: 100%; z-index: 2; }
.robot-image {
  width: 100%; height: 100%; object-fit: contain;
  filter: drop-shadow(0 10px 25px rgba(102, 126, 234, 0.3));
  transition: all 0.5s ease; transform: scaleX(-1);
}

.robot.waving .robot-image { animation: wave 0.6s ease-in-out; transform-origin: bottom center; }
@keyframes wave {
  0%, 100% { transform: scaleX(-1) rotate(0deg); }
  25% { transform: scaleX(-1) rotate(-15deg); }
  75% { transform: scaleX(-1) rotate(15deg); }
}

@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }

.glow-effect {
  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 240px; height: 240px; border-radius: 50%;
  animation: pulse 3s ease-in-out infinite; pointer-events: none; z-index: 1;
  transition: background 0.5s ease, width 0.5s ease;
}

@keyframes pulse { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.8; } }

/* TRANSITIONS */
.avatar-slide-enter-active { animation: slideInRight 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.avatar-slide-leave-active { animation: slideOutRight 0.5s ease-in-out; }
@keyframes slideInRight { 0% { transform: translateX(150px) translateY(50px); opacity: 0; } 100% { transform: translateX(0) translateY(0); opacity: 1; } }
@keyframes slideOutRight { 0% { transform: translateX(0) scale(1); opacity: 1; } 100% { transform: translateX(150px) scale(0.8); opacity: 0; } }

.bubble-enter-active { animation: bubbleIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.bubble-leave-active { animation: bubbleOut 0.2s ease-in-out; }
@keyframes bubbleIn { 0% { transform: scale(0) translateY(10px); opacity: 0; } 100% { transform: scale(1) translateY(0); opacity: 1; } }
@keyframes bubbleOut { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(0.8); opacity: 0; } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.avatar-wrapper.clickable:hover { cursor: pointer; }
.avatar-wrapper.clickable:hover .robot-image { transform: scaleX(-1) scale(1.05); }

@media (max-width: 768px) {
  .avatar-wrapper { bottom: 80px; left: 10px; }
  .speech-bubble { max-width: 250px; font-size: 13px; }
  .robot-container { width: 120px; height: 120px; }
  .glow-effect { width: 160px; height: 160px; }
}
</style>