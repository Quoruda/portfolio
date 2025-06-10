<script>

import json_output from '@/assets/agent_example_output.json?raw';

import {defineComponent} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import ImageComponent from "@/components/ImageComponent.vue";

export default defineComponent({
  components: {ImageComponent, CodeBlock},

  data() {
    return {
      json_output
    };
  },

})
</script>

<template>
  <div class="projet-stage">

    <h3>Introduction</h3>
    <p>
      Au cours de mon stage de 2 mois chez Magna Steyr France, j’ai eu l’opportunité de travailler sur un projet très intéressant alliant automatisation et intelligence artificielle.
      Ma mission était de développer des macros pour automatiser des processus dans CATIA V5, un logiciel de conception assistée par ordinateur (CAO) utilisé dans l'industrie aéronautique, automobile, etc., à l’aide de la bibliothèque Python <strong>pycatia</strong>.
      Ces macros avaient pour but d'améliorer l'efficacité des ingénieurs en automatisant des tâches répétitives et en réduisant les erreurs humaines.
      À mon arrivée, il n’existait pas de liste préétablie de macros à développer. J’ai donc dû identifier les besoins au cours de mon stage et me fixer des objectifs de manière autonome.
      Les employés présents n'étaient pas développeurs, ni familier avec la programmation mais ouvert à ce sujet, ils avait déjà tenté de créer des macros avec des IA génératives, mais sans grand succès.
    </p>

    <h3>Prise en main</h3>
    <p>
      Pour commencer, j’ai dû me familiariser avec le logiciel de CAO, un nouvel univers aux concepts et terminologies spécifiques.
      Pour réaliser mes tests avec pycatia et observer le comportement du code, j’ai utilisé Jupyter Notebook, un environnement interactif permettant d’écrire du code Python et de visualiser les résultats en temps réel en exécutant des cellules.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/jupyter_notebook_demo.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <p>
      J’ai commencé par créer des macros simples, puis j’ai développé une interface servant de bibliothèque de macros, permettant aux utilisateurs de les exécuter facilement.
      Cette application est une interface graphique développée en Python avec <strong>tkinter</strong>, qui permet de lancer et configurer les macros.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v2.png')" alt="Capture d'écran de l'application"/>

    <h3>Un nouvel objectif</h3>

    <p>
      Au fur et à mesure de mon stage, j'ai réalisé que les macros créées étaient utiles, mais que je ne pourrais pas en créer suffisamment pour répondre à tous les besoins des ingénieurs.
      Étant donné qu'il n'y avait pas de développeur, la maintenance et l'ajout de nouvelles macros seraient difficiles après mon départ.
      L'idée de créer une facade à pycatia m'est alors venue, afin de simplifier l'utilisation de pycatia et de permettre aux ingénieurs de créer leurs propres macros.
      Cela nécessiterait tout de même de toucher un peu au code, mais cela permettrait de réduire considérablement la complexité et d'éviter les erreurs.
    </p>

    <ImageComponent :src="'nothing'" alt="Comparaison entre un code pycatia et la facade"/>


    <h3>Ajout d’une couche IA</h3>

    <p>
      Après avoir commencé à développer la façade, une idée m'est venue: peut être que l'IA générative pourrait être capable d'utiliser la facade pour générer du code fonctionnel.
      Jusqu'à présent, les IA génératives avaient été utilisées pour générer du code, mais le résultat était souvent erroné dès que le code devait interragir avec CATIA V5. Cela est dû à leurs manque de connaissance sur CATIA et la complexité de son API.
      Mais peut être que si l'IA avait accès à une bibliothèque simplifiée, elle pourrait générer du code fonctionnel.
      En fournissant à l’IA un prompt décrivant son rôle et comportement ainsi que les fonctions de la façade, j’ai obtenu de bons résultats. Pour le démontrer, j’ai intégré cette IA à l’application, sous forme d’une macro interactive capable de répondre en direct à la demande de l’utilisateur.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_interactive_demo.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <p>
      Cette fonctionnalité prouve qu’une IA peut être utilisée pour générer du code fonctionnel, ouvrant ainsi la voie à de nouvelles possibilités d’automatisation dans CATIA V5.
      Cependant, elle peut encore faire des erreurs, tant sur le plan du code que de la compréhension de la demande. Le choix a donc été fait d’en faire un <strong>assistant à la création de macros</strong>, permettant de tester et sauvegarder le code uniquement s’il est valide.
      Le reste de mon stage a été consacré au remplissage de la facade et l'intégration de l'IA dans l'application.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v3.png')" alt="Capture d'écran de l'application"/>

    <p>
      Grâce à cette nouvelle interface, les utilisateurs peuvent facilement discuter avec l’IA pour créer ou modifier des macros existantes.
      Elle est séparée en deux grandes parties:<br>
      La partie de gauche dédié au code avec un éditeur de code python, des boutons pour exécuter/sauvegarder/importer le code et un bouton permettant d'afficher la liste des fonctions de la facade.<br>
      La partie de droite dédiée à l'IA, avec un éditeur de texte pour discuter avec l'IA, des propositions de prompt prédéfinis.<br>
      Ci-dessous, un exemple où l’utilisateur demande à l’IA de créer une macro prenant une capture de chaque pièce individuellement, afin d’utiliser les images comme illustrations dans un document.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_creation_macro_spielberg.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <h3>À propos de l'IA</h3>

    <p>
      L’IA utilisée repose sur un modèle de l'entreprise française <strong>Mistral</strong>, qui crée des modèles open-source et qui fait partie des rare à fournir une clé d'API gratuitement, parfait pour réaliser des tests.
      Différent modèles open-source de cette entreprise ont été testés. La première utilisait codestral un modèle de langage spécialisé dans le code, mais rapidement remplacé par devstral son remplaçant officiel.
      Le choix s'est finalement porté sur mistral-small, un modèle de langage généraliste, car il s'est avéré plus performant pour comprendre la demande de l'utilisateur, faire des propositions pour mené à bien la tâche et générer du code fonctionnel.
      Voici le schéma de la première version de l’architecture du projet, dans laquelle l’utilisateur envoie une requête à l’IA, qui génère du code en utilisant la façade de pycatia, lequel est ensuite exécuté dans CATIA V5.

    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema.png')" alt="Schéma de l'architecture du projet"/>

    <p>
      Cette première version présentait un inconvénient : le nombre de fonctions dans la façade était trop important, ce qui entraînait des oublis ou des utilisations incorrectes par l’IA.
      J’ai donc conçu une version basée sur le principe de la <strong>RAG (Retrieval-Augmented Generation)</strong>. Grâce à l’<strong>embedding</strong>, le système récupère automatiquement les fonctions de la façade les plus pertinentes en fonction de la requête utilisateur, ce qui permet de réduire considérablement les erreurs.
    </p>

    <p>
      L’<strong>embedding</strong> est une technique qui transforme des données en vecteurs, facilitant leur comparaison. Elle permet de faire une recherche sémantique, c’est-à-dire une recherche basée sur le sens des mots et leur contexte, plus précise qu’une recherche par mots-clés. Cela permet de mieux capter l’intention de l’utilisateur, quelle que soit la formulation ou la langue utilisée.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema_rag.png')" alt="Schéma de l'architecture du projet RAG"/>

    <p>
      L'IA ne génère pas le code entier à chaque fois, seulement les fonctions qu'il modifie. Mon programme récupère les fonctions modifié dans le code et les remplace par le code généré par IA. Cela permet d'éviter que l'IA semme des erreur dans le code à des endroit ou il n'a meme pas fait de modification.
      Voici un exemple de réponse que l'IA pourrait donner
    </p>

    <CodeBlock
        language="javascript"
        :code="JSON.stringify(json_output, null, 2)"/>


    <h3>Conclusion</h3>

   <p>
      Ce projet a été une expérience enrichissante, me permettant de découvrir le monde de la CAO et d’appliquer mes compétences en programmation pour résoudre des problèmes concrets.
      J’ai appris à travailler avec des API complexes, à développer des interfaces utilisateur et à intégrer des modèles d’IA dans des applications réelles.
      L’utilisation de l’IA générative pour créer du code fonctionnel ouvre de nouvelles perspectives pour l’automatisation dans CATIA V5, et j’espère que ce projet pourra être utilisé par les ingénieurs de Magna Steyr France pour améliorer leur efficacité et réduire les erreurs humaines.
   </p>

  </div>
</template>