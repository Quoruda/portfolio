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
      Au cours de mon stage de <strong>deux mois</strong> chez <strong>Magna Steyr France</strong>, j’ai eu l’opportunité de travailler sur un projet mêlant <strong>automatisation</strong> et <strong>intelligence artificielle</strong>.
      Ma mission consistait à développer des <strong>macros</strong> pour automatiser des processus dans <strong>CATIA V5</strong>, un logiciel de <strong>conception assistée par ordinateur (CAO)</strong> utilisé notamment dans les industries <strong>aéronautique</strong> et <strong>automobile</strong>.
      Pour cela, j’ai utilisé la bibliothèque Python <strong>pycatia</strong>. Ces macros visaient à améliorer l’efficacité des ingénieurs en automatisant des <strong>tâches répétitives</strong> et en limitant les <strong>erreurs humaines</strong>.
    </p>
    <p>
      À mon arrivée, <strong>aucune liste prédéfinie</strong> de macros n’existait. J’ai donc <strong>identifié les besoins</strong> au fil du stage et <strong>défini mes objectifs</strong> de manière autonome.
      Les employés n’étaient ni développeurs ni familiers avec la programmation, mais restaient ouverts à ce type de solutions. Ils avaient déjà tenté de créer des macros avec des <strong>IA génératives</strong>, mais sans résultats probants.
    </p>

    <h3>Prise en main</h3>
    <p>
      J’ai d’abord dû me familiariser avec l’<strong>environnement CAO</strong>, un domaine doté de ses propres <strong>concepts</strong> et <strong>terminologies</strong>.
      Pour expérimenter avec <strong>pycatia</strong> et observer les effets du code, j’ai utilisé <strong>Jupyter Notebook</strong>, un environnement interactif idéal pour exécuter et tester du code Python par cellules.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/jupyter_notebook_demo.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <p>
      J’ai commencé par développer des <strong>macros simples</strong>, puis conçu une <strong>interface graphique</strong> servant de <strong>bibliothèque de macros</strong>, permettant aux utilisateurs de les exécuter facilement.
      Cette interface a été développée avec <strong>tkinter</strong>, et permet de lancer et configurer les macros de manière intuitive.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v2.png')" alt="Capture d'écran de l'application" />

    <h3>Un nouvel objectif</h3>
    <p>
      Au fil du stage, je me suis rendu compte que, même si les macros développées étaient utiles, il serait difficile d’en produire suffisamment pour répondre à tous les besoins.
      En l’absence de développeurs, la <strong>maintenance</strong> et l’<strong>évolution</strong> du projet seraient également compliquées après mon départ.
    </p>
    <p>
      C’est alors que m’est venue l’idée de créer une <strong>façade pour pycatia</strong> : une couche d’<strong>abstraction simplifiée</strong> permettant aux ingénieurs de créer leurs propres macros plus facilement.
      Bien qu’une certaine base en <strong>programmation</strong> reste nécessaire, cette approche réduit considérablement la <strong>complexité</strong> et limite les risques d’<strong>erreurs</strong>.
    </p>

    <p>Dans cet exemple montrant des fonctions Pycatia on peut voir que les valeur définissant la propriété de couleur est inversé entre la fonction de récupération et celle de modification.<br>
      C'est un petit détail qui peut être rapidement source d'erreur surtout si ce n'est pas la seule exception qui à ce problème.
    </p>
    <code-block :code="'' +
     '#récupérer la couleur\n' +
     'get_real_color(inheritance: int, red: int, green: int, blue: int)\n' +
      '#modifier la couleur\n' +
      'set_real_color(red: int, green: int, blue: int, inheritance: int)'
" language="python"></code-block>

    <ImageComponent :src="'nothing'" alt="Comparaison entre un code pycatia et la facade" />

    <h3>Ajout d’une couche IA</h3>
    <p>
      En développant la façade, une nouvelle idée a émergé : pourquoi ne pas exploiter l’<strong>IA générative</strong> pour produire du code fonctionnel à partir de cette façade ?
      Jusqu’alors, les tentatives d’utilisation de l’IA pour interagir avec <strong>CATIA V5</strong> s’étaient soldées par des échecs, notamment à cause de la <strong>complexité de son API</strong>.
      Cependant, une <strong>bibliothèque simplifiée</strong> pourrait améliorer la <strong>pertinence</strong> du code généré.
    </p>
    <p>
      En fournissant à l’IA un <strong>prompt</strong> détaillant son rôle et les <strong>fonctions disponibles</strong> dans la façade, j’ai obtenu de <strong>bons résultats</strong>.
      J’ai donc intégré cette IA à l’application, sous la forme d’une <strong>macro interactive</strong> répondant directement aux demandes des utilisateurs.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_interactive_demo.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <p>
      Cette fonctionnalité démontre qu’une <strong>IA peut générer du code pertinent</strong>, ouvrant la voie à de nouvelles formes d’<strong>automatisation</strong> dans <strong>CATIA V5</strong>.
      Toutefois, l’IA reste imparfaite : elle peut mal interpréter une demande ou générer du code erroné.
      C’est pourquoi j’ai choisi d’en faire un <strong>assistant à la création de macros</strong>, qui ne permet l’exécution ou la sauvegarde du code que s’il est <strong>valide</strong>.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v3.png')" alt="Capture d'écran de l'application" />

    <p>
      Grâce à cette interface, les utilisateurs peuvent interagir avec l’<strong>IA</strong> pour <strong>créer ou modifier des macros</strong>.
      Elle se compose de deux zones principales :
      <br>– La partie gauche est dédiée au <strong>code</strong>, avec un <strong>éditeur Python</strong>, des boutons d'<strong>exécution</strong>, de <strong>sauvegarde</strong> et d’<strong>importation</strong>, ainsi qu’un affichage des fonctions disponibles.
      <br>– La partie droite est réservée à l’<strong>IA</strong>, avec un <strong>éditeur de texte</strong> pour la conversation et des <strong>prompts prédéfinis</strong>.
    </p>
    <p>
      <strong>Exemple</strong> : un utilisateur demande à l’IA de créer une macro générant une <strong>capture d’écran</strong> pour chaque pièce, afin d’utiliser les images dans un document.
    </p>

    <video width="640" height="360" controls muted>
      <source src="@/assets/videos/ia_creation_macro_spielberg.mp4" type="video/mp4">
      Votre navigateur ne supporte pas la balise vidéo.
    </video>

    <h3>À propos de l’IA</h3>
    <p>
      L’IA utilisée s’appuie sur un modèle développé par l’entreprise française <strong>Mistral</strong>, spécialisée dans les <strong>modèles open-source</strong>.
      Elle fournit des <strong>clés API gratuites</strong>, idéales pour les phases de test.
    </p>
    <p>
      Plusieurs modèles ont été testés. J’ai d’abord utilisé <strong>Codestral</strong>, un modèle spécialisé dans le code, rapidement remplacé par son successeur <strong>DevStral</strong>.
      Finalement, c’est <strong>Mistral-small</strong>, un modèle <strong>généraliste</strong>, qui s’est révélé le plus performant, notamment pour <strong>comprendre les demandes</strong>, <strong>proposer des solutions</strong> et <strong>générer du code fiable</strong>.
    </p>
    <p>
      Voici le <strong>schéma de l’architecture initiale</strong> du projet : l’utilisateur envoie une requête, l’IA génère du code utilisant la façade <strong>pycatia</strong>, puis ce code est exécuté dans <strong>CATIA V5</strong>.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema.png')" alt="Schéma de l'architecture du projet" />

    <p>
      Cette première version avait une limite : la façade contenait <strong>trop de fonctions</strong>, rendant leur utilisation par l’IA <strong>aléatoire</strong> ou <strong>incorrecte</strong>.
    </p>
    <p>
      Pour pallier cela, j’ai implémenté une architecture fondée sur le principe du <strong>RAG (Retrieval-Augmented Generation)</strong>.
      Grâce à l’<strong>embedding</strong>, le système sélectionne automatiquement les <strong>fonctions les plus pertinentes</strong> à partir de la requête utilisateur, réduisant drastiquement les erreurs.
    </p>
    <p>
      L’<strong>embedding</strong> transforme les données (ici, les fonctions) en <strong>vecteurs</strong> pour en faciliter la comparaison.
      Cela permet une <strong>recherche sémantique</strong> — basée sur le <strong>sens</strong> et non sur des mots-clés exacts — et améliore la <strong>compréhension de la demande</strong>, quelle que soit sa formulation.
    </p>

    <ImageComponent src="https://www.couchbase.com/blog/wp-content/uploads/2024/02/image1-1.png" alt="Schéma de l'architecture du projet RAG" />

    <p>
      Voici le <strong>schéma de l’architecture du projet en utilisant le RAG</strong>.
      Le processus est le suivant : <br>
      1. L’utilisateur envoie une requête.
      2. On transforme la requête en <strong>embedding</strong>.
      3. On recherche les <strong>fonctions les plus pertinentes</strong> dans la base de données, en utilisant l’<strong>embedding</strong>.
      4. On envoie une requête à l’IA, qui génère du code en lui rappelant les fonctions les plus pertinentes.
      5. On récupère le code python pour Catia généré par l’IA.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema_rag.png')" alt="Schéma de l'architecture du projet RAG" />

    <p>
      L'<strong>IA</strong> ne génère pas systématiquement tout le code : elle se concentre sur les <strong>fonctions à modifier</strong>.
      Mon programme extrait ces fonctions du code existant et les <strong>remplace uniquement si nécessaire</strong>, limitant les risques d’introduire des erreurs dans des parties non modifiées.
    </p>
    <p>
      <strong>Exemple de réponse générée</strong> :
    </p>

    <CodeBlock language="json" :code="JSON.stringify(json_output, null, 2)" />

    <h3>Conclusion</h3>
    <p>
      Ce projet a été une <strong>expérience extrêmement enrichissante</strong>. Il m’a permis de découvrir l’univers de la <strong>CAO</strong> tout en mobilisant mes compétences en <strong>programmation</strong> pour répondre à des problématiques concrètes.
      J’ai appris à <strong>manipuler des API complexes</strong>, à <strong>développer des interfaces ergonomiques</strong>, et à <strong>intégrer des modèles d’IA</strong> dans un outil utilisé en entreprise.
    </p>
    <p>
      L’intégration de l’<strong>IA générative</strong> ouvre de <strong>nouvelles perspectives</strong> pour l’<strong>automatisation</strong> dans <strong>CATIA V5</strong>.
      J’espère que cette solution aidera les ingénieurs de <strong>Magna Steyr France</strong> à <strong>améliorer leur productivité</strong>, tout en <strong>limitant les erreurs humaines</strong>.
    </p>

  </div>

</template>