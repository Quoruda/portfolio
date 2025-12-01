<script setup>
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Ajout de l'événement 'success'
const emit = defineEmits(['close', 'success']);

const closeForm = () => {
  emit('close');
};

// 1. Déclaration des états et des données du formulaire
const formEndpoint = 'https://formspree.io/f/xqarpkbv'; // Votre endpoint Formspree
// Suppression de name
const email = ref('');
// Réintroduction de subject
const subject = ref('');
const message = ref('');

const isSubmitting = ref(false); // État de chargement
const successMessage = ref(''); // Message de succès
const errorMessage = ref(''); // Message d'erreur

// 3. Propriété calculée pour vérifier la validité du formulaire
const isFormValid = computed(() => {
  return email.value.trim() !== '' &&
      subject.value.trim() !== '' &&
      message.value.trim() !== '';
});


// 2. Fonction de soumission asynchrone
const handleSubmit = async () => {
  if (!isFormValid.value) {
    return;
  }

  isSubmitting.value = true;
  successMessage.value = '';
  errorMessage.value = '';

  const formData = {
    email: email.value,
    _subject: subject.value,
    message: message.value,
  };

  try {
    const response = await fetch(formEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      // Succès
      successMessage.value = t('contact.form.success');

      // On prévient le parent (l'Avatar) que le message est parti
      emit('success');

      email.value = '';
      subject.value = '';
      message.value = '';

      // Délai réduit pour une fermeture plus rapide (1.5s au lieu de 3s)
      setTimeout(() => {
        closeForm();
      }, 1500);
    } else {
      const errorData = await response.json();
      errorMessage.value = errorData.error || t('contact.form.error');
      console.error('Formspree Error:', errorData);
    }
  } catch (error) {
    errorMessage.value = t('contact.form.networkError');
    console.error('Network Error:', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="contact-overlay" @click.self="closeForm">
    <div class="contact-form-container">
      <div class="form-header">
        <h2>{{ t('contact.title') }}</h2>
        <button @click="closeForm" class="close-btn">✕</button>
      </div>

      <p class="form-description">
        {{ t('contact.description') }}
        <br><br>
        {{ t('contact.directLink') }}
        <a href="mailto:audrick.soltner@edu.univ-fcomte.fr" class="email-link">audrick.soltner@edu.univ-fcomte.fr</a>
      </p>

      <form @submit.prevent="handleSubmit" class="contact-form">
        <div class="form-group">
          <label for="email">{{ t('contact.form.email') }}</label>
          <input
              id="email"
              name="email"
              type="email"
              required
              v-model="email"
              :placeholder="t('contact.form.emailPlaceholder')"
          />
        </div>

        <div class="form-group">
          <label for="subject">{{ t('contact.form.subject') }}</label>
          <input
              id="subject"
              name="_subject"
              type="text"
              required
              v-model="subject"
              :placeholder="t('contact.form.subjectPlaceholder')"
          />
        </div>

        <div class="form-group">
          <label for="message">{{ t('contact.form.message') }}</label>
          <textarea
              id="message"
              name="message"
              required
              rows="5"
              v-model="message"
              :placeholder="t('contact.form.messagePlaceholder')"
          ></textarea>
        </div>

        <p v-if="successMessage" class="status-message success-message">
          {{ successMessage }}
        </p>
        <p v-else-if="errorMessage" class="status-message error-message">
          {{ errorMessage }}
        </p>

        <button
            type="submit"
            class="submit-btn"
            :disabled="isSubmitting || successMessage || !isFormValid"
        >
          <span v-if="isSubmitting">
            {{ t('contact.form.sending') }}...
          </span>
          <span v-else>
            {{ t('contact.form.send') }}
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Styles existants conservés */
.status-message {
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
}

.success-message {
  background-color: rgba(96, 165, 250, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(96, 165, 250, 0.4);
}

.error-message {
  background-color: rgba(255, 99, 71, 0.2);
  color: tomato;
  border: 1px solid rgba(255, 99, 71, 0.4);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.contact-form-container {
  background: linear-gradient(135deg, #0f1419 0%, #1a1f35 100%);
  border: 2px solid rgba(102, 126, 234, 0.3);
  border-radius: 20px;
  padding: 30px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
  animation: slideUp 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes slideUp {
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.form-header h2 {
  color: #60a5fa;
  font-size: 24px;
  font-weight: 700;
  margin: 0;
}

.close-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
  transform: rotate(90deg);
}

.form-description {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 20px;
  line-height: 1.5;
}

.email-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.email-link:hover {
  color: #764ba2;
  text-decoration: underline;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.95);
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgba(102, 126, 234, 0.6);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

/* Scrollbar */
.contact-form-container::-webkit-scrollbar {
  width: 8px;
}

.contact-form-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.contact-form-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.contact-form-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 768px) {
  .contact-form-container {
    padding: 20px;
  }
}
</style>