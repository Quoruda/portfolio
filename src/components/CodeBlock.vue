<template>
  <pre class="code-block" :class="languageClass">
    <div class="line-numbers">
      <span v-for="i in lineCount" :key="i" class="line-number">{{ i }}</span>
    </div>
    <code ref="codeElement" :class="languageClass" v-html="highlightedCode"></code>
    <button class="copy-button" @click="copyCode" title="Copier">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
      </svg>
    </button>
    <div v-if="showCopyNotification" class="copy-notification">Copié !</div>
  </pre>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python' // Assurez-vous que ce composant est bien chargé
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/plugins/line-numbers/prism-line-numbers' // Plugin pour les numéros de ligne
import 'prismjs/plugins/line-highlight/prism-line-highlight' // Plugin pour surligner des lignes
import 'prismjs/themes/prism-tomorrow.css' // Thème plus complet

export default {
  props: {
    code: {
      type: String,
      required: true
    },
    language: {
      type: String,
      default: 'javascript'
    }
  },
  setup(props) {
    const highlightedCode = ref('')
    const showCopyNotification = ref(false)

    const languageClass = computed(() => `language-${props.language}`)

    const highlight = () => {
      try {
        const grammar = Prism.languages[props.language] || Prism.languages.javascript;

        const highlighted = Prism.highlight(
            props.code,
            grammar,
            props.language
        );

        highlightedCode.value = highlighted
            .split('\n')
            .map(line => `<span class="line">${line || ' '}</span>`)
            .join('\n');
      } catch (error) {
        console.error(`Erreur lors de la coloration syntaxique: ${error.message}`);
        highlightedCode.value = props.code
            .split('\n')
            .map(line => `<span class="line">${line || ' '}</span>`)
            .join('\n');
      }
    }

    const lineCount = computed(() => {
      return props.code.split('\n').length;
    });

    const copyCode = () => {
      navigator.clipboard.writeText(props.code).then(() => {
        showCopyNotification.value = true;
        setTimeout(() => {
          showCopyNotification.value = false;
        }, 2000);
      }).catch((err) => {
        console.error('Échec de la copie du code:', err);
      })
    }

    watch(() => props.code, highlight, { immediate: true })
    watch(() => props.language, highlight)
    onMounted(highlight)

    return {
      highlightedCode,
      languageClass,
      lineCount,
      copyCode,
      showCopyNotification
    }
  }
}
</script>


<style scoped>
.code-block {
  max-height: 800px;
  border-radius: 14px;
  max-width: min(800px, 92%);
  margin: 20px auto;
  background: rgba(45, 45, 45, 0.8);
  backdrop-filter: blur(2px);
  color: #f8f8f2;
  font-family: 'Fira Code', monospace, monospace;
  font-size: 1rem;
  box-shadow: 0 4px 8px rgb(0 0 0 / 0.3);
  user-select: text;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 0;
  display: flex;
  position: relative;
  overflow: hidden;
}

.code-block code {
  margin: 0 20px 0 0;
  object-fit: contain;
  display: block;
  padding: 1em 0 1em 15px;
  overflow-x: auto;
  flex: 1;
  line-height: 1.5;
  font-family: 'Fira Code', monospace, monospace;
  font-size: 1rem;
}

.code-block code .line {
  display: block;
  height: 1.5em;
  white-space: pre;
}

.line-numbers {
  display: flex;
  flex-direction: column;
  padding: 1em 12px 1em 20px;
  background-color: rgba(30, 30, 30, 0.5);
  user-select: none;
  text-align: right;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  margin-right: 10px;
  color: #aaa;
  font-family: 'Fira Code', monospace, monospace;
  font-size: 1rem;
  line-height: 1.5;
}

.line-number {
  display: block;
  height: 1.5em;
  font-size: 1rem;
}

.code-block:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

.copy-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  color: #f8f8f2;
  border: none;
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  z-index: 2;
}

.copy-button:hover,
.copy-button:focus {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
  outline: none;
}

.copy-button:focus-visible {
  box-shadow: 0 0 0 2px #f8f8f2;
}

.copy-button:active {
  background-color: rgba(255, 255, 255, 0.2);
}

.copy-button .icon {
  width: 20px;
  height: 20px;
  stroke: #f8f8f2;
}

.copy-button:hover .icon {
  stroke: #ffffff;
}

.copy-notification {
  position: absolute;
  top: 10px;
  right: 50px;
  background-color: rgba(50, 205, 50, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  animation: fadeIn 0.3s, fadeOut 0.5s 1.5s;
  pointer-events: none;
  font-size: 0.9rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}

/* Ajoutez des styles personnalisés pour les tokens spécifiques */
.token.keyword {
  color: #569cd6; /* Couleur pour les mots-clés (comme 'def', 'class') */
}

.token.string {
  color: #ce9178; /* Couleur pour les chaînes */
}

.token.function {
  color: #dcdcaa; /* Couleur pour les noms de fonctions */
}

.token.comment {
  color: #6a9955; /* Couleur pour les commentaires */
}

.token.variable {
  color: #9cdcfe; /* Couleur pour les variables */
}

.token.operator {
  color: #d4d4d4; /* Couleur pour les opérateurs (comme '=', '+', '-') */
}

.token.number {
  color: #b5cea8; /* Couleur pour les nombres */
}

.token.class-name {
  color: #4ec9b0; /* Couleur pour les noms de classes */
}

.token.parameter {
  color: #9cdcfe; /* Couleur pour les paramètres de fonction */
}

.token.punctuation {
  color: #d4d4d4; /* Couleur pour la ponctuation (comme ',', ':', '.') */
}

.token.constant {
  color: #4fc1ff; /* Couleur pour les constantes */
}

.token.boolean {
  color: #569cd6; /* Couleur pour les valeurs booléennes (True, False) */
}

/* Ajoutez des styles pour les erreurs ou les avertissements */
.token.error {
  color: #f44747; /* Couleur pour les erreurs */
  background-color: rgba(255, 0, 0, 0.1);
}

.token.warning {
  color: #ff8800; /* Couleur pour les avertissements */
  background-color: rgba(255, 136, 0, 0.1);
}
</style>
