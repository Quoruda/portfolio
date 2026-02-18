<script setup>
import { ref, computed } from 'vue'
import Application from '../base/Application.vue'
import MarkdownReader from '../base/MarkdownReader.vue'
import Window from '../base/Window.vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()


// Liste des projets intégrée (remplace projects.js)
const projects = [
  {
    id: 'magna',
    thumbnail: '/magna/magna.jpg',
    markdownFiles: {
      fr: '/magna/magnaStage_fr.md',
      en: '/magna/magnaStage_en.md',
    },
  },
  {
    id: 'fractals',
    thumbnail: '/fractals/mandelbrot.png',
    url: 'https://quoruda.github.io/FractalViewer',
    githubUrl: 'https://github.com/Quoruda/FractalViewer',
    markdownFiles: {
      fr: '/fractals/fractals_fr.md',
      en: '/fractals/fractals_en.md',
    },
  },
  {
    id: 'gameoflife',
    thumbnail: '/GameOfLife/demonstration.gif',
    markdownFiles: {
      fr: '/GameOfLife/GameOfLife_fr.md',
      en: '/GameOfLife/GameOfLife_en.md',
    },
    githubUrl: 'https://github.com/Quoruda/GameOfLife',
    releaseUrl: 'https://github.com/Quoruda/GameOfLife/releases',
  },
  {
    id: 'nodalpy',
    thumbnail: '/nodalpy/concept.png',
    markdownFiles: {
      fr: '/nodalpy/nodalpy_fr.md',
      en: '/nodalpy/nodalpy_en.md',
    },
    githubUrl: 'https://github.com/Quoruda/NodalPy',
  },
  {
    id: '3dengine',
    thumbnail: '/3D_engine/demonstration.gif',
    markdownFiles: {
      fr: '/3D_engine/3D_engine_fr.md',
      en: '/3D_engine/3D_engine_en.md',
    },
    githubUrl: 'https://github.com/Quoruda/3D-Engine',
  },
  {
    id: "videoscrambler",
    markdownFiles: {
      fr: '/VideoScrambler/videoscrambler_fr.md',
      en: '/VideoScrambler/videoscrambler_en.md',
    },
    thumbnail: "/VideoScrambler/demonstration.gif",
    githubUrl: "https://github.com/Quoruda/VideoScrambler",
  },
  {
    id: "fractal_compressor",
    markdownFiles: {
      fr: '/fractal_compressor/fractal_compressor_fr.md',
      en: '/fractal_compressor/fractal_compressor_en.md',
    },
    thumbnail: "/fractal_compressor/thumbnail.png",
  }
]

// IDs des projets actuellement ouverts (affichés avec MarkdownReader)
const openReaders = ref([])

const openProject = (project) => {
  if (!openReaders.value.includes(project.id)) {
    openReaders.value.push(project.id)
  }
}

const closeProject = (projectId) => {
  openReaders.value = openReaders.value.filter(id => id !== projectId)
}

const openDemo = (project) => {
  if (project.url) {
    const newWindow = window.open(project.url, '_blank')
    if (newWindow) newWindow.opener = null
  }
}

const openRelease = (project) => {
  if (project.releaseUrl) {
    const newWindow = window.open(project.releaseUrl, '_blank')
    if (newWindow) newWindow.opener = null
  }
}

const openCode = (project) => {
  if (project.githubUrl) {
    const newWindow = window.open(project.githubUrl, '_blank')
    if (newWindow) newWindow.opener = null
  }
}

const getProjectById = (id) => projects.find(p => p.id === id)

// Obtenir le fichier markdown selon la langue courante
const getMarkdownFile = (project) => {
  if (!project || !project.markdownFiles) return ''
  return project.markdownFiles[locale.value] || project.markdownFiles['en'] || project.markdownFiles['fr'] || ''
}

// Obtenir le nom traduit du projet
const getProjectName = (projectId) => {
  return t(`projects.projects.${projectId}.name`)
}
</script>

<template>
  <application :name="t('app.desktop.projectManager')" icon="/icons/projects.png">
    <div class="portfolio-container">
      <!-- Liste des projets en cartes verticales -->
      <div class="projects-list">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img :src="project.thumbnail" :alt="getProjectName(project.id)" class="project-thumb"/>
          <div class="project-content">
            <h3 class="project-name">{{ getProjectName(project.id) }}</h3>
            <div class="project-actions">
              <button class="btn btn-info" @click="openProject(project)">
                {{ t('projects.buttons.info') }}
              </button>
              <button v-if="project.url" class="btn btn-demo" @click="openDemo(project)">
                {{ t('projects.buttons.demo') }}
              </button>
              <button v-if="project.releaseUrl" class="btn btn-release" @click="openRelease(project)">
                {{ t('projects.buttons.download') }}
              </button>
              <button v-if="project.githubUrl" class="btn btn-code" @click="openCode(project)">
                {{ t('projects.buttons.code') }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lecteurs Markdown ouverts directement dans des Windows -->
      <div v-for="id in openReaders" :key="id">
        <Window :name="t('projects.window.title')" icon="ℹ️" :id="id" @close="closeProject(id)">
          <MarkdownReader :markdown-content="getMarkdownFile(getProjectById(id))" />
        </Window>
      </div>

    </div>
  </application>
</template>

<style scoped>
.portfolio-container {
  height: 100%;
  padding: clamp(12px, 3vw, 20px);
  background: linear-gradient(135deg, #0f1419 0%, #1a1f35 100%);
  color: #e0e6ff;
  overflow-y: auto;
}

.projects-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(10px, 1.5vw, 14px);
  max-width: 1000px;
  margin: 0 auto;
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 12px rgba(139, 92, 246, 0.2);
  border-color: rgba(139, 92, 246, 0.3);
}

.project-thumb {
  width: 100%;
  height: clamp(120px, 20vw, 180px);
  object-fit: cover;
  display: block;
}

.project-content {
  padding: clamp(10px, 2.5vw, 14px);
}

.project-name {
  font-weight: 700;
  color: #60a5fa;
  margin: 0 0 clamp(8px, 1.5vw, 10px) 0;
  font-size: clamp(0.95rem, 2.5vw, 1.1rem);
  text-align: center;
}

.project-actions {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(6px, 1.5vw, 8px);
  align-items: center;
  justify-content: center;
}

.btn {
  padding: clamp(6px, 1.5vw, 9px) clamp(10px, 2vw, 14px);
  background: rgba(139, 92, 246, 0.3);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: clamp(0.8rem, 2vw, 0.9rem);
  text-align: center;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(139, 92, 246, 0.4);
}

.btn:active {
  transform: translateY(0);
}

.btn-info {
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
}

.btn-demo {
  background: linear-gradient(135deg, #10b981, #059669);
}

.btn-release {
  background: linear-gradient(135deg, #ec4899, #db2777);
}

.btn-code {
  background: linear-gradient(135deg, #f59e0b, #d97706);
}
</style>
