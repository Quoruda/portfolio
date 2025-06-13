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
  </pre>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-css'
import 'prismjs/themes/prism-okaidia.css'

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
    const languageClass = `language-${props.language}`

    const highlight = () => {
      // Ajoute des span pour chaque ligne pour assurer l'alignement avec les numéros
      const highlighted = Prism.highlight(
          props.code,
          Prism.languages[props.language] || Prism.languages.javascript,
          props.language
      );

      // Sépare le code en lignes et ajoute des spans avec la classe 'line' pour chaque ligne
      // Ajoute également un espacement pour les lignes vides
      highlightedCode.value = highlighted
          .split('\n')
          .map(line => `<span class="line">${line || ' '}</span>`)
          .join('\n');
    }

    // Calcule le nombre de lignes pour la numérotation
    const lineCount = computed(() => {
      return props.code.split('\n').length;
    });

    const copyCode = () => {
      navigator.clipboard.writeText(props.code).then(() => {
        alert('Code copié dans le presse-papier !')
      }).catch(() => {
        alert('Échec de la copie du code.')
      })
    }

    watch(() => props.code, highlight, { immediate: true })
    watch(() => props.language, highlight)
    onMounted(highlight)

    return {
      highlightedCode,
      languageClass,
      lineCount,
      copyCode
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
}

.code-block code {
  margin: 0 20px 0 0;
  object-fit: contain;
  display: block;
  padding: 1em 0 1em 15px; /* Ajout de padding-left pour créer de l'espace */
  overflow-x: auto;
  flex: 1;
  line-height: 1.5;
  font-family: 'Fira Code', monospace, monospace;
  font-size: 1rem;
}

.code-block code .line {
  display: block;
  height: 1.5em; /* Hauteur fixe au lieu de min-height */
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
  margin-right: 10px; /* Ajout d'une marge à droite */
  color: #888;
  font-family: 'Fira Code', monospace, monospace; /* Même police que le code */
  font-size: 1rem; /* Même taille que le code */
  line-height: 1.5; /* Même ligne que le code */
}

.line-number {
  display: block;
  height: 1.5em; /* Hauteur fixe identique aux lignes de code */
  font-size: 1rem; /* Même taille que le code, pas de réduction */
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
}

.copy-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
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
</style>
