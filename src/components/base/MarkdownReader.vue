<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import Application from "./Application.vue"
import { marked } from 'marked'
import Prism from 'prismjs'

// Importer les langages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup' // HTML
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-bash'

// Importer le thème
import 'prismjs/themes/prism-tomorrow.css'

// Définir la prop
const props = defineProps({
  markdownContent: {
    type: String,
    default: '# Sorry!\n\nNo markdown content provided.'
  }
})

// Configuration du renderer personnalisé pour les vidéos
const renderer = new marked.Renderer()

renderer.image = function(token) {
  const href = token.href || token
  const title = token.title || ''
  const text = token.text || ''

  // Convertir href en chaîne si nécessaire
  const hrefStr = String(href)
  const videoType = hrefStr.split('.').pop().toLowerCase()
  if (hrefStr.match(/\.(mp4|webm|ogg)$/i)) {
    return `
      <div class="video-component">
            <video controls muted preload="auto">
            <source src="${hrefStr}" type="video/${videoType}">
            <p>Your browser does not support the video tag</p>
            </video>
            <div class="video-caption">${text}</div>
      </div>
   `
  }
  // Rendu normal pour les images
  return `
        <div class="image-container">
            <img src="${hrefStr}" alt="${text}" title="${title}" loading="lazy" class="image-component">
            <span class="image-caption">${text}</span>
        </div>
    `
}

// Configuration de marked
marked.setOptions({
  breaks: true,
  gfm: true,
  renderer: renderer
})

const renderedHtml = ref('')
const loading = ref(false)
const error = ref(null)

const isUrl = (content) => {
  try {
    new URL(content)
    return true
  } catch {
    return false
  }
}

const isFilePath = (content) => {
  return content.endsWith('.md') && !content.includes('\n')
}

const loadMarkdownFile = async (filePath) => {
  try {
    loading.value = true
    error.value = null

    // Vérifier si window.fs existe
    if (window.fs && typeof window.fs.readFile === 'function') {
      // Utiliser l'API window.fs.readFile pour lire le fichier
      const fileContent = await window.fs.readFile(filePath, { encoding: 'utf8' })
      return fileContent
    } else {
      // Fallback: essayer de charger via fetch (si c'est une URL ou un chemin accessible)
      const response = await fetch(filePath)
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      return await response.text()
    }
  } catch (err) {
    error.value = `Erreur lors du chargement du fichier : ${err.message}`
    console.error('Error loading markdown file:', err)
    return null
  } finally {
    loading.value = false
  }
}

const renderMarkdown = async (content) => {
  if (!content) return

  renderedHtml.value = marked.parse(content)
  await nextTick()
  Prism.highlightAll()
}

const processMarkdownContent = async () => {
  if (isFilePath(props.markdownContent) || isUrl(props.markdownContent)) {
    // Si c'est un chemin de fichier ou une URL, charger le fichier
    const fileContent = await loadMarkdownFile(props.markdownContent)
    if (fileContent) {
      await renderMarkdown(fileContent)
    }
  } else {
    // Si c'est du contenu direct, le rendre directement
    await renderMarkdown(props.markdownContent)
  }
}

onMounted(() => {
  processMarkdownContent()
})

// Watcher pour mettre à jour le rendu quand la prop change
watch(() => props.markdownContent, () => {
  processMarkdownContent()
})
</script>

<template>
  <application icon="https://cdn-icons-png.freepik.com/512/3344/3344379.png" name="readme.md">
    <div class="markdown-viewer">
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Chargement du fichier...</p>
      </div>

      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <p>{{ error }}</p>
      </div>

      <div v-else class="markdown-content" v-html="renderedHtml"></div>
    </div>
  </application>
</template>

<style scoped>

.markdown-viewer {
  height: 100%;
  overflow-y: auto;
  padding: 32px;
  background: rgba(255, 255, 255, 0.02);
}

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgba(255, 255, 255, 0.7);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.error-state p {
  color: #ef4444;
  text-align: center;
  max-width: 500px;
}

.markdown-content {
  max-width: 800px;
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
}

/* Titres */
.markdown-content :deep(h1) {
  font-size: 2.5em;
  font-weight: 700;
  margin-bottom: 0.5em;
  margin-top: 0;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.markdown-content :deep(h2) {
  font-size: 2em;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  color: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid rgba(59, 130, 246, 0.3);
  padding-bottom: 0.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.5em;
  font-weight: 600;
  margin-top: 1.3em;
  margin-bottom: 0.5em;
  color: rgba(255, 255, 255, 0.9);
}

/* Paragraphes */
.markdown-content :deep(p) {
  margin-bottom: 1em;
  color: rgba(255, 255, 255, 0.8);
}

/* Liens */
.markdown-content :deep(a) {
  color: #3b82f6;
  text-decoration: none;
  border-bottom: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.2s;
}

.markdown-content :deep(a:hover) {
  color: #60a5fa;
  border-bottom-color: #60a5fa;
}

/* Listes */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin-bottom: 1em;
  padding-left: 2em;
}

.markdown-content :deep(li) {
  margin-bottom: 0.5em;
  color: rgba(255, 255, 255, 0.8);
}

/* Code inline */
.markdown-content :deep(code:not(pre code)) {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.2em 0.5em;
  border-radius: 6px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  color: #7dd3fc;
}

/* Blocs de code - Override Prism styles */
.markdown-content :deep(pre) {
  background: rgba(0, 0, 0, 0.4) !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px !important;
  padding: 1.5em !important;
  overflow-x: auto;
  margin-bottom: 1.5em;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.markdown-content :deep(pre code) {
  background: none !important;
  border: none;
  padding: 0 !important;
  font-size: 0.95em;
  font-family: 'Monaco', 'Courier New', monospace;
  line-height: 1.6;
  text-shadow: none !important;
}

/* Citations */
.markdown-content :deep(blockquote) {
  border-left: 4px solid #3b82f6;
  padding-left: 1.5em;
  margin: 1.5em 0;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
  background: rgba(59, 130, 246, 0.05);
  padding: 1em 1.5em;
  border-radius: 0 8px 8px 0;
}

/* Tableaux */
.markdown-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
}

.markdown-content :deep(th) {
  background: rgba(59, 130, 246, 0.2);
  padding: 12px;
  text-align: left;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
  border-bottom: 2px solid rgba(59, 130, 246, 0.3);
}

.markdown-content :deep(td) {
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
}

.markdown-content :deep(tr:last-child td) {
  border-bottom: none;
}

.markdown-content :deep(tr:hover) {
  background: rgba(255, 255, 255, 0.03);
}

/* Séparateurs */
.markdown-content :deep(hr) {
  border: none;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
  margin: 2em 0;
}

/* Strong et emphasis */
.markdown-content :deep(strong) {
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.markdown-content :deep(em) {
  font-style: italic;
  color: rgba(255, 255, 255, 0.85);
}

/* Scrollbar personnalisée */
.markdown-viewer::-webkit-scrollbar {
  width: 8px;
}

.markdown-viewer::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.markdown-viewer::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.3);
  border-radius: 4px;
}

.markdown-viewer::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.5);
}

.markdown-content :deep(.video-component) {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 2em auto;
  padding: 1.5em;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.markdown-content :deep(.video-component:hover) {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(59, 130, 246, 0.3);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.2);
  transform: translateY(-4px);
}

.markdown-content :deep(.video-component video) {
  width: 100%;
  height: auto;
  max-height: 650px;
  display: block;
  border-radius: 8px;
  background: #000;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}



.markdown-content :deep(.video-caption) {
  margin-top: 1em;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875em;
  font-style: italic;
  line-height: 1.6;
  letter-spacing: 0.02em;
}

/* Indicateur de chargement (optionnel) */
.markdown-content :deep(.video-component)::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 3px solid rgba(59, 130, 246, 0.2);
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: video-loading 1s linear infinite;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.markdown-content :deep(.video-component video:not([src])) + .video-component::before {
  opacity: 1;
}

@keyframes video-loading {
  to { transform: rotate(360deg); }
}



.markdown-content :deep(.image-container) {
  position: relative;
  max-width: 800px;
  width: 100%;
  margin: 2em auto;
  padding: 1.5em;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.markdown-content :deep(.image-container:hover) {
  background: rgba(0, 0, 0, 0.4);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 12px 40px rgba(139, 92, 246, 0.2);
  transform: translateY(-4px);
}

.markdown-content :deep(.image-component) {
  width: 100%;
  max-height: 500px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInImage 0.6s ease-out forwards;
}

@keyframes fadeInImage {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.markdown-content :deep(.image-caption) {
  margin-top: 1em;
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875em;
  font-style: italic;
  line-height: 1.6;
  letter-spacing: 0.02em;
  padding: 0 1em;
}

/* État de chargement pour les images */
.markdown-content :deep(.image-container)::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  margin: -20px 0 0 -20px;
  border: 3px solid rgba(139, 92, 246, 0.2);
  border-top-color: #8b5cf6;
  border-radius: 50%;
  animation: image-loading 1s linear infinite;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
  z-index: 1;
}

@keyframes image-loading {
  to { transform: rotate(360deg); }
}

</style>