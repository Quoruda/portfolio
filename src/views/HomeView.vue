<template>
  <div class="home-view" :style="{ backgroundColor: currentBackgroundColor }">

    <nav class="navbar">
        <ul class="nav-list">
          <li v-for="section in sections" :key="section.id" class="nav-item">
            <a
              @click="scrollToSection(section.id)"
              class="nav-link"
            >
              {{ section.title }}
            </a>
          </li>
        </ul>
    </nav>
    <div class="particles" v-for="(project, index) in projects" :key="index">
      <ParticlesComponent :particles_colors=project.colors  :links_color=project.links_color  v-if="index===selected_project"/>
    </div>
    <!-- Content section -->
    <div class="content">


      <!-- Title and description -->
      <h1 class="title hover-effect" style="color: #ff9800;">Audrick Soltner</h1>
      <p class="description hover-effect">Bienvenue sur mon portfolio, où je présente mes projets, compétences et expériences.</p>

      <!-- About section with enlarged description -->
      <section class="about" id="about" ref="about">
        <h2>À propos de moi</h2>
        <p>
          Développeur web passionné par le front-end, j'aime créer des interfaces modernes et interactives. J'ai une forte expérience avec Vue.js, JavaScript, CSS et je suis toujours à la recherche de nouvelles techniques pour améliorer mes compétences.
          <br><br>
          En plus de mes compétences techniques, je suis également très organisé et capable de travailler en équipe. Je suis quelqu'un qui apprend rapidement et j'aime les défis.
        </p>
      </section>

      <!-- Projects section with enlarged descriptions -->
      <section class="projects" id="projects" ref="projects">
        <h2>Mes Projets</h2>
        <div class="project-list">
          <div class="project-card" v-for="(project, index) in projects" :key="index" @click="select_project(index)">
            <img :src="project.image" :alt="project.name" />
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}
              <br><br>
              <!-- Stack used for the project -->
              Stack utilisé: {{ project.stack }}
            </p>
            <a :href="project.link" target="_blank" class="btn">Voir le projet</a>
          </div>
        </div>
      </section>

      <section class="project" id="project">
        <h2>{{getNameProject}}</h2>

        <ProjetStage v-if="getIdProject === 'stage'" />
        <div v-else-if="selected_project >= 0">
            Nothing to display for this project.
        </div>

      </section>

      <!-- Skills section with enlarged descriptions -->
      <section class="skills" id="skills" ref="skills">
        <h2>Compétences</h2>
        <ul>
          <li
              v-for="(skill, index) in skills"
              :key="index"
              :class="{ 'hover-effect': hoveredIndex === index }"
              @mouseover="hoveredIndex = index"
              @mouseleave="hoveredIndex = -1"
          >
            {{ skill }}
            <!-- Experience level -->

            <span v-if="hoveredIndex === index">(Expérience: {{ experienceLevels[index] }})</span>
          </li>
        </ul>
      </section>

      <!-- Contact section with enlarged description -->
      <section class="contact">
        <h2>Contact</h2>
        <form @submit.prevent="submitForm" class="contact-form">
          <!-- Name input field -->
          <input type="text" v-model="form.name" placeholder="Votre nom" required />
          <!-- Email input field -->
          <input type="email" v-model="form.email" placeholder="Votre email" required />
          <!-- Message textarea with enlarged size -->
          <textarea v-model="form.message" placeholder="Votre message" rows="6" required></textarea>
          <button type="submit" >Envoyer</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>

import ParticlesComponent from "@/components/ParticlesComponent.vue";
import ProjetStage from "@/components/ProjetStage.vue";

export default {
  name: 'HomeView',
  components: {ProjetStage, ParticlesComponent},
  data() {
    
    return {
      hoveredIndex: -1,
      selected_project: 0,
      projects: [
        {
          name: "Stage",
          id: "stage",
          description: "Projet de stage en développement d'application.",
          image: "https://www.magna.com/images/default-source/brand/stock-photography/1920x960-menu-photos-02.jpg?Status=Temp&sfvrsn=b9bedceb_4",
          link: "#",
          colors: ["#ff9800", "#e74c3c", "#9b59b6"],
          background_color: "#1a1d23",
          links_color: "#3498db"
        },
        {
          name: "Application ToDo",
          id: "todo-app",
          description: "Une application de gestion de tâches avec Vuex.",
          image: "https://placehold.co/300x200",
          link: "#",
          background_color: "#0f1c24",
          colors: ["#00e1ff", "#ffb300", "#5e60ce"],
          links_color: "#3498db"
        },
        {
          name: "Blog personnel",
          id: "blog",
          description: "Blog responsive utilisant Vue Router et Markdown.",
          image: "https://placehold.co/300x200",
          link: "#",
          background_color: "#231e2b",
          colors: ["#f48fb1", "#ffd180", "#81ecec"],
          links_color: "#ff8fa3"
        },
        {
          name: "Dashboard Statistiques",
          id: "dashboard",
          description: "Tableau de bord interactif pour visualiser des données avec Chart.js.",
          image: "https://placehold.co/300x200",
          link: "#",
          colors: ["#00ffbf", "#a3ff00", "#ffe082"],
          background_color: "#11241c",              
          links_color: "#00e676"                    
        },
        {
          name: "Galerie d’Art Interactif",
          id: "art-gallery",
          description: "Une galerie visuelle immersive, avec animations douces et transitions artistiques.",
          image: "https://placehold.co/300x200",
          link: "#",
          colors: ["#d4af37", "#f8f1e5", "#8a6fdf"], 
          background_color: "#0e0c0b",              
          links_color: "#f5c469"                   
        }
      ],
      experienceLevels: ["Avancé", "Intermédiaire", "Avancé", "Intermédiaire", "Débutant", "Intermédiaire"],
      skills: ["Vue.js", "JavaScript", "HTML5", "CSS3", "Git", "Node.js"],
      form: {
        name: '',
        email: '',
        message: ''
      },
      sections: [
        {id: "about", title: "À propos"},
        {id: "projects", title: "Mes projets"}
      ],
    };
  },

  computed:{
    currentBackgroundColor(){
      return this.projects.at(this.selected_project).background_color
    },

    getNameProject(){
      return this.projects.at(this.selected_project).name
    },

    getIdProject(){
      return this.projects.at(this.selected_project).id
    }

  },

  methods: {
    submitForm() {
      alert(`Merci ${this.form.name}, votre message a été envoyé !`);
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    },

    scrollToSection(section){
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },

    select_project(index){
      this.selected_project=index
      this.scrollToSection("project")
    }

  },

};
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;600&display=swap');

.navbar {
  position:fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem 0rem;
}

.nav-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  text-align: center;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.home-view {
  padding: 0px;
  font-family: 'Poppins', sans-serif;
  color: #d8d8d8;
  min-height: 100vh;
  overflow-x: hidden;
  width: 100vw;
  transition: background-color 1.2s ease, color 1.2s ease;
}


.content {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 40px;
  position: relative;
  z-index: 2;
}

/* TITRE */
.title {
  font-weight: 600;
  font-size: 3.6rem;
  text-align: center;
  margin-bottom: 15px;
  color: #cc7a66;
  text-shadow: 0 2px 6px rgba(204, 122, 102, 0.5);
  letter-spacing: 1.8px;
  transition: color 0.3s ease;
}

.title:hover {
  color: #d1947e;
  cursor: default;
}

/* DESCRIPTION SOUS LE TITRE */
.description {
  max-width: 700px;
  margin: 0 auto 50px;
  font-size: 1.2rem;
  text-align: center;
  line-height: 1.6;
  color: #bbb;
  font-weight: 300;
}

/* TITRES SECTIONS */
h2 {
  font-weight: 600;
  font-size: 2.2rem;
  text-align: center;
  color: #cc7a66;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 1.3px;
  position: relative;
}

h2::after {
  content: '';
  display: block;
  width: 50px;
  height: 2.5px;
  background: #cc7a66;
  margin: 12px auto 0;
  border-radius: 2px;
}

h3{
  font-weight: 600;
  font-size: 1.8rem;
  color: #b87333;
  margin-bottom: 15px;;
  text-align: center;
  user-select: none;
}


p{
  backdrop-filter: blur(2px);
}


/* ABOUT */
.about p {
  font-weight: 300;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #ccc;
  user-select: none;
  text-align: justify;
}

/* PROJETS - GRID 
.project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  padding: 0 10px;
  
}

.project-card {
  background: #273542;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}*/

.project-list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  padding: 0 10px;
  justify-content: center; /* centre la dernière ligne */
}

.project-card {
  flex: 1 1 320px; /* taille minimum 320px, flex-grow = 1 */
  max-width: 350px;
  background: #273542;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}


.project-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 15px 30px rgba(204, 122, 102, 0.3);
}

.project-card img {
  width: 100%;
  height: 200px;       /* Fixe une hauteur uniforme */
  object-fit: cover;   /* Zoom + crop pour garder le ratio et remplir */
  display: block;
  filter: brightness(0.95);
  transition: filter 0.3s ease;
  border-radius: 14px 14px 0 0; /* arrondir les coins supérieurs de l’image */
}


.project-card:hover img {
  filter: brightness(1);
}

.project-card h3 {
  font-weight: 600;
  font-size: 1.5rem;
  margin: 15px 18px 8px;
  color: #cc7a66;
  user-select: none;
}

.project-card p {
  margin: 0 18px 18px;
  color: #ddd;
  font-weight: 300;
  line-height: 1.4;
  font-size: 1rem;
}

/* STACK */
.project-card p br + span {
  display: block;
  margin-top: 8px;
  font-style: italic;
  color: #d19b85;
}

/* BOUTON PROJET */
.project-card .btn {
  margin: 0 18px 18px;
  display: inline-block;
  padding: 10px 22px;
  background: linear-gradient(45deg, #cc7a66, #d1947e);
  border-radius: 28px;
  color: white;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(204, 122, 102, 0.3);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}

.project-card .btn:hover {
  background: linear-gradient(45deg, #d1947e, #cc7a66);
  box-shadow: 0 6px 18px rgba(204, 122, 102, 0.5);
}

/* COMPETENCES - badges */
.skills ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.skills li {
  background: #cc7a66;
  padding: 8px 20px;
  border-radius: 48px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: default;
  box-shadow: 0 2px 8px rgba(204, 122, 102, 0.3);
  transition: transform 0.2s ease;
  user-select: none;
}

.skills li.hover-effect {
  transform: scale(1.1);
  box-shadow: 0 4px 14px rgba(204, 122, 102, 0.45);
}

/* EXPERIENCE LEVEL */
.skills li span {
  font-weight: 300;
  font-size: 0.85rem;
  margin-left: 6px;
  font-style: italic;
  opacity: 0.8;
  user-select: none;
}

/* FORMULAIRE CONTACT */
.contact-form {
  max-width: 100%;
  width: 90%;
  padding: 32px 20px; /* Un peu moins large pour éviter le débordement */
  box-sizing: border-box; /* Important pour inclure le padding dans la largeur */
  margin: 0 auto;
  background: rgba(39, 53, 66, 0.85);
  border-radius: 18px;
  box-shadow: 0 8px 22px rgba(204, 122, 102, 0.3);
}

.contact input,
.contact textarea {
  width: 100%;
  box-sizing: border-box; /* pareil ici */
  padding: 12px 16px;
  margin-bottom: 18px;
  border-radius: 10px;
  border: none;
  background: #364957;
  color: #ddd;
  font-size: 1rem;
  font-weight: 300;
  transition: background 0.3s ease, box-shadow 0.3s ease;
  resize: none;
}

.contact input::placeholder,
.contact textarea::placeholder {
  color: #999;
}

.contact input:focus,
.contact textarea:focus {
  outline: none;
  background: #cc7a66;
  box-shadow: 0 0 8px #cc7a66;
  color: #fff;
}

.contact button {
  width: 100%;
  padding: 14px;
  background: linear-gradient(45deg, #cc7a66, #d1947e);
  border: none;
  border-radius: 28px;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(204, 122, 102, 0.5);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
}

.contact button:hover {
  background: linear-gradient(45deg, #d1947e, #cc7a66);
  box-shadow: 0 9px 26px rgba(204, 122, 102, 0.75);
}

/* Animation fade-in for all sections */
section {
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
  animation-delay: 0.3s;
  margin-bottom: 80px;
  scroll-margin-top: 60px; 
}

section:nth-child(2) {
  animation-delay: 0.4s;
}

section:nth-child(3) {
  animation-delay: 0.5s;
}

section:nth-child(4) {
  animation-delay: 0.6s;
}

section:nth-child(5) {
  animation-delay: 0.7s;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


.project video{
  width: auto;
  height: auto;
  max-height: 400px;
  max-width: 800px;
  display: block;
  margin: 20px auto;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #000; /* fallback */
}

.project img{
  width: 100%;
  max-height: 400px;
  max-width: 800px;
  display: block;
  margin: 20px auto;
  border-radius: 14px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  object-fit: contain;
}

.project video:hover, .project img:hover {
  transform: scale(1.02);
  box-shadow: 0 12px 30px rgba(204, 122, 102, 0.5);
}

.project ul {
  list-style: none;
  padding: 0;
  margin: 20px auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project li {
  background: #273542;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 1.05rem;
  color: #ddd;
  font-weight: 300;
  box-shadow: 0 6px 16px rgba(204, 122, 102, 0.25);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project li:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(204, 122, 102, 0.35);
}

.project p {
  font-weight: 300;
  font-size: 1.1rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  color: #ccc;
  text-align: justify;
  user-select: none;
}

strong {
  font-weight: 600;
}


</style>
