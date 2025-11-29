<script setup>
import { ref, computed } from 'vue';
import Application from "../base/Application.vue";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const notes = ref([
  {
    id: 1,
    title: 'Idées de Projets',
    readonly: true,
    content: `# Idées de Projets

## Intelligence Artificielle

### LLM Mathématique from Scratch
- Objectif : Construire un LLM spécialisé dans la résolution de problèmes mathématiques
- Stack envisagée : Python, PyTorch, NumPy
- Défis techniques :
  * Architecture transformer custom
  * Dataset de problèmes mathématiques
  * Tokenization adaptée aux formules
  * Fine-tuning sur domaines spécifiques
- Phase : Recherche théorique en cours

## Gaming

### Rogue-like Navigateur
- Concept : Dungeon crawler procédural jouable dans le browser
- Stack envisagée : Vue.js, Canvas API / WebGL
- Features prévues :
  * Génération procédurale de niveaux
  * Système de combat tour par tour
  * Permadeath et progression
  * Pixel art / ASCII art
- Phase : Brainstorming gameplay

## En exploration

- Moteur de rendu volumétrique temps réel
- Synthétiseur audio WebAudio
- Outil de visualisation de données 3D
- Éditeur de shaders collaboratif
`,
    date: new Date('2025-01-15')
  },
  {
    id: 2,
    title: 'Setup & Configuration',
    readonly: true,
    content: `# Mon Setup de Développement

## Philosophie Open Source

J'utilise principalement des outils open source pour mon workflow de développement. Cela me permet de mieux comprendre les outils que j'utilise, de contribuer aux projets et de personnaliser mon environnement selon mes besoins.

## Système d'Exploitation

### Debian 13 (Trixie)
- Distribution Linux stable et fiable
- Gestion de paquets APT
- Performance et contrôle total du système
- Environnement de bureau : GNOME / KDE / i3wm (à préciser)

## Navigateurs

### Firefox (principal)
- Open source et respectueux de la vie privée
- DevTools puissants pour le développement web
- Extensions : uBlock Origin, React DevTools, Vue DevTools

### Chromium (tests)
- Pour tester la compatibilité cross-browser
- Lighthouse intégré pour l'audit de performance

## IDE & Éditeurs

### VSCodium (principal)
- Version open source de VS Code sans télémétrie Microsoft
- Éditeur léger et performant
- Extensions : Prettier, ESLint, GitLens, Vue Language Features
- Terminal intégré et personnalisable
- Idéal pour le développement web quotidien

### IntelliJ IDEA (projets complexes)
- Suite complète pour projets d'envergure
- Support multi-langage (Java, JavaScript, Python, etc.)
- Plugins : Vue.js, GitToolBox, Rainbow Brackets
- Refactoring puissant et analyse de code avancée
- Débogage sophistiqué
- Note : Seul outil propriétaire de mon setup, justifié par ses capacités avancées

## Outils de Développement

### Version Control
- Git (ligne de commande)
- GitHub pour l'hébergement de code

### Terminal
- Bash comme shell principal
- Aliases personnalisés pour commandes fréquentes
- Tmux pour multiplexage terminal
`,
    date: new Date('2025-01-20')
  }
]);
const selectedNoteId = ref(1);
const editingTitle = ref(false);
const showSidebar = ref(true);

const selectedNote = computed(() => {
  return notes.value.find(n => n.id === selectedNoteId.value) || null;
});

const createNote = () => {
  const newNote = {
    id: Date.now(),
    title: 'New Note',
    content: '',
    date: new Date()
  };
  notes.value.unshift(newNote);
  selectedNoteId.value = newNote.id;
  showSidebar.value = false;
};

const deleteNote = () => {
  if (notes.value.length === 1) return;
  if (selectedNote.value?.readonly) return;

  const index = notes.value.findIndex(n => n.id === selectedNoteId.value);
  notes.value.splice(index, 1);
  selectedNoteId.value = notes.value[0].id;
};

const selectNote = (id) => {
  selectedNoteId.value = id;
  showSidebar.value = false;
};

const updateContent = (e) => {
  if (selectedNote.value && !selectedNote.value.readonly) {
    selectedNote.value.content = e.target.value;
    selectedNote.value.date = new Date();
  }
};

const updateTitle = (e) => {
  if (selectedNote.value && !selectedNote.value.readonly) {
    selectedNote.value.title = e.target.value || 'Untitled';
    selectedNote.value.date = new Date();
  }
};

const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;

  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;

  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
};

const getPreview = (content) => {
  return content.slice(0, 60) + (content.length > 60 ? '...' : '');
};
</script>

<template>
  <application icon="/icons/notes.png" :name="t('app.desktop.notes')">
    <div class="notes-app">
      <!-- Sidebar -->
      <div class="sidebar" :class="{ 'sidebar-visible': showSidebar }">
        <div class="sidebar-header">
          <button class="btn-new" @click="createNote">
            <span class="icon">+</span>
            New Note
          </button>
          <button class="btn-close" @click="showSidebar = false">×</button>
        </div>

        <div class="notes-list">
          <div
              v-for="note in notes"
              :key="note.id"
              class="note-item"
              :class="{ active: note.id === selectedNoteId }"
              @click="selectNote(note.id)"
          >
            <div class="note-item-header">
              <h3>{{ note.title }}</h3>
              <span class="note-date">{{ formatDate(note.date) }}</span>
            </div>
            <p class="note-preview">{{ getPreview(note.content) }}</p>
          </div>
        </div>
      </div>

      <!-- Overlay -->
      <div class="overlay" v-show="showSidebar" @click="showSidebar = false"></div>

      <!-- Editor -->
      <div class="editor" v-if="selectedNote">
        <div class="editor-header">
          <button class="btn-menu" @click="showSidebar = true">☰</button>

          <input
              v-if="editingTitle && !selectedNote.readonly"
              type="text"
              class="title-input"
              :value="selectedNote.title"
              @input="updateTitle"
              @blur="editingTitle = false"
              @keyup.enter="editingTitle = false"
              ref="titleInput"
              autofocus
          />
          <h1 v-else class="editor-title" @click="!selectedNote.readonly && (editingTitle = true)">
            {{ selectedNote.title }}
          </h1>

          <button class="btn-delete" @click="deleteNote" :disabled="notes.length === 1 || selectedNote.readonly">
            <span class="icon">🗑️</span>
          </button>
        </div>

        <textarea
            class="editor-content"
            :class="{ 'readonly': selectedNote.readonly }"
            :value="selectedNote.content"
            @input="updateContent"
            :readonly="selectedNote.readonly"
            placeholder="Start writing..."
        ></textarea>
      </div>
    </div>
  </application>
</template>

<style scoped>
.notes-app {
  width: 100%;
  height: 100%;
  display: flex;
  background: #ffffff;
  border-radius: 0 0 12px 12px;
  overflow: hidden;
  position: relative;
}

/* Sidebar */
.sidebar {
  width: 300px;
  min-width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 12px 12px;
}

.btn-new {
  flex: 1;
  padding: 12px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.2s;
}

.btn-new:hover {
  background: #0051d5;
}

.btn-new .icon {
  font-size: 1.2rem;
  font-weight: 300;
}

.btn-close {
  display: none;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: #666;
}

.btn-close:hover {
  background: #e8eaed;
}

.notes-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.note-item {
  padding: 10px 12px;
  margin-bottom: 2px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.note-item:hover {
  background: #e8eaed;
}

.note-item.active {
  background: #e3f2fd;
}

.note-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 4px;
}

.note-item h3 {
  margin: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1f1f1f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.note-date {
  font-size: 0.75rem;
  color: #666;
  flex-shrink: 0;
  margin-left: 8px;
}

.note-preview {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.overlay {
  display: none;
}

/* Editor */
.editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
}

.editor-header {
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.btn-menu {
  display: none;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1.3rem;
  line-height: 1;
  cursor: pointer;
  color: #666;
  flex-shrink: 0;
}

.btn-menu:hover {
  background: #f8f9fa;
}

.editor-title {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f1f1f;
  cursor: text;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.title-input {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
  color: #1f1f1f;
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-family: inherit;
}

.btn-delete {
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.btn-delete:hover:not(:disabled) {
  background: #fee;
  border-color: #fcc;
}

.btn-delete:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.editor-content {
  flex: 1;
  padding: 20px;
  border: none;
  outline: none;
  font-size: 0.95rem;
  line-height: 1.6;
  font-family: inherit;
  resize: none;
  color: #1f1f1f;
}

.editor-content::placeholder {
  color: #999;
}

.editor-content.readonly {
  background: #f8f9fa;
  cursor: default;
}

.editor-title {
  cursor: text;
}

.readonly + .editor-title {
  cursor: default;
}

/* Scrollbar */
.notes-list::-webkit-scrollbar {
  width: 6px;
}

.notes-list::-webkit-scrollbar-track {
  background: transparent;
}

.notes-list::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.notes-list::-webkit-scrollbar-thumb:hover {
  background: #999;
}

/* Responsive - Mode mobile/vertical */
@media (max-width: 768px) {
  .btn-menu {
    display: block;
  }

  .sidebar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 85%;
    max-width: 320px;
    transform: translateX(-100%);
    z-index: 1000;
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  }

  .sidebar.sidebar-visible {
    transform: translateX(0);
  }

  .btn-close {
    display: block;
  }

  .overlay {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 999;
  }

  .editor {
    width: 100%;
  }
}
</style>