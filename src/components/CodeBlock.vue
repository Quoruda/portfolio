<template>
  <pre class="code-block" :class="languageClass">
    <div class="line-numbers">
      <span v-for="i in lineCount" :key="i" class="line-number">{{ i }}</span>
    </div>
    <code ref="codeElement" :class="languageClass" v-html="highlightedCode"></code>
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

    watch(() => props.code, highlight, { immediate: true })
    watch(() => props.language, highlight)
    onMounted(highlight)

    return {
      highlightedCode,
      languageClass,
      lineCount
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
</style>

