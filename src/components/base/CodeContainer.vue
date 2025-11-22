<template>
  <div class="code-container">
    <button class="copy-btn" @click="copyToClipboard">{{ copied ? 'Copié !' : 'Copier' }}</button>
    <pre class="line-numbers"><code ref="codeBlock" :class="`language-${language}`"></code></pre>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Prism from 'prismjs'

// Charger d'abord les composants de language
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-json'

// Ensuite charger les plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers.js'
import 'prismjs/plugins/line-highlight/prism-line-highlight.js'

// Finalement charger les CSS
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import 'prismjs/plugins/line-highlight/prism-line-highlight.css'

const props = defineProps({
  code: String,
  language: { type: String, default: 'javascript' }
})

const codeBlock = ref(null)
const copied = ref(false)

const createLineNumbers = (pre, code) => {
  const lines = code.split('\n')
  // Si la dernière ligne est vide, ne pas la compter
  const lineCount = lines[lines.length - 1] === '' ? lines.length - 1 : lines.length

  const lineNumbersWrapper = document.createElement('span')
  lineNumbersWrapper.className = 'line-numbers-rows'
  lineNumbersWrapper.setAttribute('aria-hidden', 'true')

  for (let i = 0; i < lineCount; i++) {
    const lineSpan = document.createElement('span')
    lineNumbersWrapper.appendChild(lineSpan)
  }

  pre.appendChild(lineNumbersWrapper)
}

const highlight = () => {
  console.log('CodeContainer highlight called with:', { code: props.code, language: props.language })

  if (codeBlock.value && codeBlock.value.parentElement) {
    const pre = codeBlock.value.parentElement

    console.log('Pre element found:', pre)

    // Nettoyer complètement le pre
    const existingRows = pre.querySelector('.line-numbers-rows')
    if (existingRows) {
      existingRows.remove()
      console.log('Removed existing line numbers')
    }

    // Mettre à jour le contenu du code
    codeBlock.value.textContent = props.code
    codeBlock.value.className = `language-${props.language}`

    // S'assurer que la classe line-numbers est présente sur le pre
    pre.classList.add('line-numbers')
    console.log('Added line-numbers class to pre')

    // Appliquer Prism highlight
    Prism.highlightElement(codeBlock.value)
    console.log('Applied Prism highlighting')

    // Toujours créer les numéros de ligne manuellement
    createLineNumbers(pre, props.code)
    console.log('Created line numbers manually')

    // Vérifier que les numéros ont été créés
    const newRows = pre.querySelector('.line-numbers-rows')
    console.log('Line numbers created:', newRows, 'Children count:', newRows?.children.length)
  } else {
    console.error('CodeBlock ref or parent not found')
  }
}

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 1500)
  } catch (e) {
    console.error('Échec de la copie :', e.message)
  }
}

onMounted(highlight)
watch(() => props.code, highlight)
</script>

<style scoped>
.code-container {
  position: relative;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  margin: 1.5em 0;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}


.code-container:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow:
    0 12px 40px rgba(59, 130, 246, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.copy-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.copy-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  border-color: rgba(59, 130, 246, 0.5);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.copy-btn:active {
  transform: translateY(0);
}

pre.line-numbers {
  position: relative;
  padding: 1em 1em 1em 4em;
  counter-reset: linenumber;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
  font-size: 0.875rem;
  line-height: 1.7;
  background: transparent !important;
}

pre.line-numbers > code {
  position: relative;
  white-space: pre;
  display: block;
  color: rgba(255, 255, 255, 0.9);
}

/* Styles pour les numéros de ligne */
pre.line-numbers .line-numbers-rows {
  position: absolute;
  pointer-events: none;
  top: 1.5em;
  left: 0;
  width: 3.5em;
  letter-spacing: -1px;
  border-right: 1px solid rgba(59, 130, 246, 0.2);
  user-select: none;
  font-size: 100%;
  background: rgba(0, 0, 0, 0.2);
  padding-right: 0.5em;
}

pre.line-numbers .line-numbers-rows > span {
  display: block;
  counter-increment: linenumber;
  padding-right: 0.8em;
  text-align: right;
  line-height: 1.7;
  transition: color 0.2s ease;
}

pre.line-numbers .line-numbers-rows > span:before {
  content: counter(linenumber);
  color: rgba(59, 130, 246, 0.6);
  font-weight: 500;
}

pre.line-numbers .line-numbers-rows > span:hover:before {
  color: rgba(59, 130, 246, 0.9);
}

/* Scrollbar personnalisée pour le code */
pre.line-numbers::-webkit-scrollbar {
  height: 8px;
}

pre.line-numbers::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

pre.line-numbers::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  transition: background 0.3s ease;
}

pre.line-numbers::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

/* Animation pour le code qui apparaît */
@keyframes fadeInCode {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.code-container {
  animation: fadeInCode 0.4s ease-out;
}


</style>