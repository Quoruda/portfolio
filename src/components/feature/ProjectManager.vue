<script setup>
import { ref } from 'vue'
import Application from '../base/Application.vue'
import MarkdownReader from '../base/MarkdownReader.vue'
import Window from '../base/Window.vue'


// Liste des projets intégrée (remplace projects.js)
const projects = [
  {
    id: 'magna',
    name: 'MSFR - Assistant IA CATIA',
    thumbnail: '/magna/magna.jpg',
    markdownFile: '/magna/magnaStage.md',
  },
  {
    id: 'fractals',
    name: 'Visualisateur de Fractales',
    thumbnail: '/fractals/mandelbrot.png',
    url: 'https://quoruda.github.io/FractalViewer',
    githubUrl: 'https://github.com/Quoruda/FractalViewer',
    markdownFile: '/fractals/fractals.md',
  },
  {
    id: 'gameoflife',
    name: 'Jeu de la Vie',
    thumbnail: '/GameOfLife/screen.png',
    markdownFile: '/GameOfLife/GameOfLife.md',
    githubUrl: 'https://github.com/Quoruda/GameOfLife',
    releaseUrl: 'https://github.com/Quoruda/GameOfLife/releases',
  },
  {
    id: 'nodalpy',
    name: 'NodalPy',
    thumbnail: '/nodalpy/concept.png',
    markdownFile: '/nodalpy/nodalpy.md',
    githubUrl: 'https://github.com/Quoruda/NodalPy',
  },
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
  if (project.url) window.open(project.url, '_blank')
}

const openRelease = (project) => {
  if (project.releaseUrl) window.open(project.releaseUrl, '_blank')
}

const openCode = (project) => {
  if (project.githubUrl) window.open(project.githubUrl, '_blank')
}

const getProjectById = (id) => projects.find(p => p.id === id)
</script>

<template>
  <application name="Projects" icon="https://cdn-icons-png.flaticon.com/512/1090/1090985.png">
    <div class="portfolio-container">
      <!-- Liste des projets en cartes verticales -->
      <div class="projects-list">
        <div v-for="project in projects" :key="project.id" class="project-card">
          <img :src="project.thumbnail" :alt="project.name" class="project-thumb"/>
          <div class="project-content">
            <h3 class="project-name">{{ project.name }}</h3>
            <div class="project-actions">
              <button class="btn btn-info" @click="openProject(project)">
                📖 Info
              </button>
              <button v-if="project.url" class="btn btn-demo" @click="openDemo(project)">
                🚀 Demo
              </button>
              <button v-if="project.releaseUrl" class="btn btn-release" @click="openRelease(project)">
                📦 Download
              </button>
              <button v-if="project.githubUrl" class="btn btn-code" @click="openCode(project)">
                💻 Code
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Lecteurs Markdown ouverts directement dans des Windows -->
      <div v-for="id in openReaders" :key="id">
        <Window name="Informations" icon="ℹ️" :id="id" @close="closeProject(id)">
          <MarkdownReader :markdown-content="getProjectById(id)?.markdownFile" />
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
