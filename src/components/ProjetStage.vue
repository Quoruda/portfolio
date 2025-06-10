<script>

import {defineComponent} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import ImageComponent from "@/components/ImageComponent.vue";

export default defineComponent({
  components: {ImageComponent, CodeBlock},

})
</script>

<template>
  <div class="projet-stage">
    <h3>Introduction</h3>
    <p>
      Ma mission était de développer des macros pour automatiser des processus dans CATIA V5, un logiciel de conception assistée par ordinateur (CAO) utilisé dans l'industrie aéronautique, automobile, etc., à l’aide de la bibliothèque Python <strong>pycatia</strong>.
      Ces macros avaient pour but d'améliorer l'efficacité des ingénieurs en automatisant des tâches répétitives et en réduisant les erreurs humaines.
      À mon arrivée, il n’existait pas de liste préétablie de macros à développer. J’ai donc dû identifier les besoins au cours de mon stage et me fixer des objectifs de manière autonome.
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

    <h3>Ajout d’une couche IA</h3>

    <p>
      Au cours du stage, j’ai constaté qu’un besoin de maintenance et d’ajout de macros persisterait après mon départ.
      J’ai donc décidé de consacrer la suite du stage au développement d’une fonctionnalité d’IA permettant de générer des macros à partir de descriptions en langage naturel.
      Le problème est que les IA génératives, comme ChatGPT, manquent de connaissances spécifiques sur CATIA et ne peuvent pas produire du code fonctionnel de manière fiable.
      J’ai donc dû trouver une solution pour que l’IA génère du code valide dans la majorité des cas.
    </p>

    <p>
      Mon choix s’est porté sur la création d’une <strong>façade</strong> à <em>pycatia</em> : une bibliothèque Python simplifiant l’utilisation de pycatia en encapsulant les appels dans des fonctions plus accessibles.
      En fournissant à l’IA un prompt décrivant son rôle ainsi que les fonctions de la façade, j’ai obtenu de bons résultats. Pour le démontrer, j’ai intégré cette IA à l’application, sous forme d’une macro interactive capable de répondre en direct à la demande de l’utilisateur.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_interactive_demo.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <p>
      Cette fonctionnalité prouve qu’une IA peut être utilisée pour générer du code fonctionnel, ouvrant ainsi la voie à de nouvelles possibilités d’automatisation dans CATIA V5.
      Cependant, elle peut encore faire des erreurs, tant sur le plan du code que de la compréhension de la demande. Le choix a donc été fait d’en faire un <strong>assistant à la création de macros</strong>, permettant de tester et sauvegarder le code uniquement s’il est valide.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v3.png')" alt="Capture d'écran de l'application"/>

    <p>
      Grâce à cette nouvelle interface, les utilisateurs peuvent facilement discuter avec l’IA pour créer ou modifier des macros existantes.
      Ci-dessous, un exemple où l’utilisateur demande à l’IA de créer une macro prenant une capture de chaque pièce individuellement, afin d’utiliser les images comme illustrations dans un document.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_creation_macro_spielberg.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <h3>À propos de l'IA</h3>

    <p>
      L’IA utilisée repose sur un modèle <strong>Mistral</strong>. Voici le schéma de la première version de l’architecture du projet, dans laquelle l’utilisateur envoie une requête à l’IA, qui génère du code en utilisant la façade de pycatia, lequel est ensuite exécuté dans CATIA V5.
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
        language="json"
        :code="
`
function hello() {
  console.log('Hello World!')
}`
"/>

    <h3>La facade</h3>

    <p>


    </p>


    <h3>Conclusion</h3>

    <p>
      Ce projet m’a permis de découvrir un environnement logiciel complexe, de développer des outils concrets pour les ingénieurs, et d’explorer l’intégration de l’IA générative dans des cas d’usage industriels.
      La mise en place d’une interface interactive et l’expérimentation avec un assistant IA démontrent le potentiel de ces technologies dans le domaine de l’automatisation technique.
    </p>

  </div>
</template>