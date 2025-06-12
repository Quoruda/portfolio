<script>

import json_output from '@/assets/agent_example_output.json?raw';

import {defineComponent} from "vue";
import CodeBlock from "@/components/CodeBlock.vue";
import ImageComponent from "@/components/ImageComponent.vue";
import VideoComponent from "@/components/VideoComponent.vue";

export default defineComponent({
  components: {VideoComponent, ImageComponent, CodeBlock},

  data() {
    return {
      json_output: JSON.stringify(json_output, 0, 2),
    };
  },

})
</script>

<template>
  <div class="projet-stage">

    <h3>Introduction</h3>
    <p>
      Durant mon stage chez <strong><a href="https://grandparis.ccibusiness.fr/msfr-magna-steyr-france" target="_blank">Magna Steyr France</a></strong>, j’ai conçu un assistant intelligent pour <strong><a href="https://www.3ds.com/fr/products/catia/catia-v5" target="_blank">CATIA V5</a></strong> mêlant <strong>automatisation, interface <a href="https://fr.wikipedia.org/wiki/Python_(langage)" target="_blank">Python</a></strong> et <strong>intelligence artificielle générative</strong>.
    </p>
    <p>
      Le but : permettre aux ingénieurs — non développeurs — de créer ou adapter des <strong>macros personnalisées</strong> simplement, grâce à une interface graphique intuitive et un assistant IA intégré.
    </p>
    <p>
      Le projet combine des compétences en <strong>programmation Python</strong>, <strong>UX</strong>, <strong><a href="https://fr.wikipedia.org/wiki/Interface_de_programmation" target="_blank">API</a> industrielle</strong> et <strong>intelligence artificielle</strong>, avec une finalité concrète : <strong>gagner du temps</strong>, <strong>réduire les erreurs</strong> et <strong>favoriser l’autonomie</strong> des utilisateurs dans leurs outils de travail.
    </p>


    <h3>Contexte</h3>
    <p>
      Mon stage de <strong>deux mois</strong> chez <strong>Magna Steyr France</strong> s’est déroulé au sein d’un service technique utilisant <strong>CATIA V5</strong>, un logiciel de <strong><a href="https://fr.wikipedia.org/wiki/Conception_assist%C3%A9e_par_ordinateur" target="_blank">CAO</a></strong> essentiel dans les secteurs <strong>automobile</strong> et <strong>aéronautique</strong>.
    </p>
    <p>
      L’équipe faisait face à de nombreuses <strong>tâches répétitives</strong> et avait tenté plusieurs solutions de scripting (<a href="https://cao.centralesupelec.fr/index.php?page=scripting.htm" target="_blank">CatScript</a>, <a href="https://fr.wikipedia.org/wiki/VBScript" target="_blank">VBScript</a>) sans succès, en raison de la complexité de l’environnement CATIA. Avant même ma prise de poste, ils avaient découvert la bibliothèque Python <strong><a href="https://pycatia.readthedocs.io/en/latest/" target="_blank">pycatia</a></strong>, et c’est naturellement devenu le **sujet de mon stage**.
    </p>
    <p>
      Mon rôle a donc consisté à explorer pycatia, à évaluer ses capacités pour automatiser efficacement les tâches, puis à développer une solution robuste. Rapidement, le projet a évolué vers la conception d’une <strong>interface graphique</strong> centralisée et l’intégration d’une <strong><a href="https://fr.wikipedia.org/wiki/Intelligence_artificielle_g%C3%A9n%C3%A9rative">IA générative</a></strong>, afin de rendre la création et la modification de macros accessibles aux ingénieurs non-développeurs.
    </p>


    <h3>Prise en main</h3>
    <p>
      J’ai d’abord dû me familiariser avec l’<strong>environnement CAO</strong>, un domaine doté de ses propres <strong>concepts</strong> et <strong>terminologies</strong>.
      Pour expérimenter avec <strong>pycatia</strong> et observer les effets du code, j’ai utilisé <strong><a href="https://jupyter.org/" target="_blank">Jupyter Notebook</a></strong>, un environnement interactif idéal pour exécuter et tester du code Python par cellules.
    </p>

    <VideoComponent :video-src="require('@/assets/videos/jupyter_notebook_demo.mp4')"/>


    <p>
      J’ai commencé par développer des <strong>macros simples</strong>, puis conçu une <strong>interface graphique</strong> servant de <strong>bibliothèque de macros</strong>, permettant aux utilisateurs de les exécuter facilement.
      Cette interface a été développée avec <strong>Tkinter</strong> et permet de lancer et configurer les macros de manière intuitive.
    </p>
    <p>
      Le choix de <strong>Tkinter</strong> s’explique par sa simplicité d’intégration et sa légèreté. Contrairement à des bibliothèques comme <strong><a href="https://fr.wikipedia.org/wiki/PyQt" target="_blank">PyQt</a></strong>, Tkinter est inclus par défaut dans Python, ce qui facilite le déploiement de l’application sans avoir à gérer de dépendances supplémentaires.
      Bien que plus basique en termes de rendu graphique, il offre suffisamment de souplesse pour créer une interface claire, fonctionnelle et maintenable. Étant donné que l’objectif était de concevoir un outil rapidement opérationnel et facile à transmettre, Tkinter constituait le choix le plus pragmatique dans le contexte du stage.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v2.png')" alt="Capture d'écran de l'application" caption="Capture d'écran de la bibliothèque de macro"/>

    <h3>Un nouvel objectif</h3>
    <p>
      Au fil du stage, je me suis rendu compte que, même si les macros développées étaient utiles, il serait difficile d’en produire suffisamment pour répondre à tous les besoins.
      En l’absence de développeurs, la <strong>maintenance</strong> et l’<strong>évolution</strong> du projet seraient également compliquées après mon départ.
    </p>
    <p>
      C’est alors que m’est venue l’idée de créer une <strong><a href="https://refactoring.guru/fr/design-patterns/facade" target="_blank">façade</a>  pour pycatia</strong> : <strong> une <a href="	https://fr.wikipedia.org/wiki/Abstraction_(informatique)" target="_blank">couche d’abstraction</a> simplifiée</strong> permettant aux ingénieurs de créer leurs propres macros plus facilement.
      Bien qu’une certaine base en <strong>programmation</strong> reste nécessaire, cette approche réduit considérablement la <strong>complexité</strong> et limite les risques d’<strong>erreurs</strong>.
    </p>

    <p>Dans cet exemple montrant des fonctions pycatia, on peut voir que les valeurs définissant la propriété de couleur sont inversées entre la fonction de récupération et celle de modification.<br>
      C’est un petit détail qui peut rapidement devenir source d’erreurs, surtout s’il ne s’agit pas de la seule exception présentant ce type de problème.
    </p>
    <code-block :code="'' +
     '# récupérer la couleur\n' +
     'get_real_color() -> (inheritance: int, red: int, green: int, blue: int)\n' +
      '# modifier la couleur\n' +
      'set_real_color(red: int, green: int, blue: int, inheritance: int)'
" language="python"></code-block>

    <p>Les deux codes suivants montrent la différence entre une utilisation directe de pycatia et l’utilisation avec la façade.</p>

    <code-block :code="'# pycatia\ncaa = catia()\n'+
'document = caa.active_document\n'+
'part = document.part\n'+
'bodies = part.bodies\n'+
'selection = caa.active_window.selection\n'+
'selection.clear()\n'+
'for body in bodies:\n'+
'    selection.add(body)\n'+
'selection.vis_properties.set_real_color(255, 0, 0, 0)\n'+
'selection.clear()\n'" language="python"></code-block>

    <code-block :code="'# façade\npart = get_active_part()\n'+
'bodies = get_bodies_of_part(part)\n'+
'set_color(bodies, (255, 0, 0, 0))'" language="python"></code-block>

    <p>On remarque que le code utilisant pycatia nécessite de préparer la sélection avant de pouvoir modifier la couleur, alors que la façade permet de modifier directement les corps sans avoir à gérer la sélection.</p>

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

    <video-component :video-src="require('@/assets/videos/ia_interactive_demo.mp4')" />


    <p>
      Cette fonctionnalité démontre qu’une <strong>IA peut générer du code pertinent</strong>, ouvrant la voie à de nouvelles formes d’<strong>automatisation</strong> dans <strong>CATIA V5</strong>.
      Toutefois, l’IA reste imparfaite : elle peut mal interpréter une demande ou générer du code erroné.
      C’est pourquoi j’ai choisi d’en faire un <strong>assistant à la création de macros</strong>, qui ne permet l’exécution ou la sauvegarde du code que s’il est <strong>valide</strong>.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_app_v3.png')" alt="Capture d'écran de l'application" caption="Capture d'écran de l'éditeur de macro"/>

    <p>
      Grâce à cette interface, les utilisateurs peuvent interagir avec l’<strong>IA</strong> pour <strong>créer ou modifier des macros</strong>.
      Elle se compose de deux zones principales :
      <br>– La partie gauche est dédiée au <strong>code</strong>, avec un <strong>éditeur Python</strong>, des boutons d’<strong>exécution</strong>, de <strong>sauvegarde</strong> et d’<strong>importation</strong>, ainsi qu’un affichage des fonctions disponibles.
      <br>– La partie droite est réservée à l’<strong>IA</strong>, avec un <strong>éditeur de texte</strong> pour la conversation et des <strong>prompts prédéfinis</strong>.
    </p>
    <p>
      <strong>Exemple</strong> : un utilisateur demande à l’IA de créer une macro générant une <strong>capture d’écran</strong> pour chaque pièce, afin d’utiliser les images dans un document.
    </p>

    <VideoComponent :video-src="require('@/assets/videos/ia_creation_macro_spielberg.mp4')" />

    <h3>À propos de l’IA</h3>
    <p>
      L’IA utilisée s’appuie sur un modèle développé par l’entreprise française <strong><a href="https://fr.wikipedia.org/wiki/Mistral_AI" target="_blank">Mistral AI</a></strong>, spécialisée dans les <strong>modèles open-source</strong>.
      Elle fournit des <strong>clés API gratuites</strong>, idéales pour les phases de test.
    </p>
    <p>
      Plusieurs modèles ont été testés. J’ai d’abord utilisé <strong><a href="https://mistral.ai/fr/news/codestral" target="_blank">Codestral</a></strong>, un modèle spécialisé dans le code, rapidement remplacé par son successeur <strong><a href="https://mistral.ai/fr/news/devstral" target="_blank">Devstral</a></strong>.
      Finalement, c’est <strong><a href="https://mistral.ai/news/mistral-small-3-1" target="_blank">Mistral-small</a></strong>, un modèle <strong>généraliste</strong>, qui s’est révélé le plus performant, notamment pour <strong>comprendre les demandes</strong>, <strong>proposer des solutions</strong> et <strong>générer du code fiable</strong>.
    </p>
    <p>
      Voici le <strong>schéma de l’architecture initiale</strong> du projet : l’utilisateur envoie une requête, l’IA génère du code utilisant la façade <strong>pycatia</strong>, puis ce code est exécuté dans <strong>CATIA V5</strong>.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema.png')" alt="Schéma de l'architecture du projet" caption="Schéma de l'architecture de l'agent sans RAG"/>

    <p>
      Cette première version avait une limite : la façade contenait <strong>trop de fonctions</strong>, rendant leur utilisation par l’IA <strong>aléatoire</strong> ou <strong>incorrecte</strong>.
    </p>
    <p>
      Pour pallier cela, j’ai implémenté une architecture fondée sur le principe du <strong><a href="https://datascientest.com/retrieval-augmented-generation-tout-savoir" target="_blank">RAG (Retrieval-Augmented Generation)</a></strong>.
      Grâce à l’<strong><a href="https://generationia.flint.media/p/c-est-quoi-un-embedding" target="_blank">embedding</a></strong>, le système sélectionne automatiquement les <strong>fonctions les plus pertinentes</strong> à partir de la requête utilisateur, réduisant drastiquement les erreurs.
    </p>
    <p>
      J’ai fait le choix d’un système <strong>RAG</strong> plutôt que d’un <strong><a href="https://datascientest.com/fine-tuning-tout-savoir" target="_blank">fine-tuning</a></strong> de modèle, principalement pour des raisons de <strong>temps</strong>, de <strong>ressources</strong> et de <strong>quantité de données disponibles</strong>.
      Le fine-tuning aurait nécessité un corpus conséquent d’exemples annotés, ainsi qu’un environnement technique adapté à l’entraînement de modèles. Ce n’était pas compatible avec les contraintes du stage. À l’inverse, le RAG permet de s’appuyer sur un <strong>modèle préexistant</strong> tout en adaptant dynamiquement ses réponses via une base de connaissances.
    </p>
    <p>
      Cette approche présente également l’avantage d’être <strong>facilement maintenable</strong> : la mise à jour ou l’ajout de fonctions dans la base ne nécessite pas de réentraîner un modèle. C’est donc une solution souple, efficace et bien plus adaptée à un contexte de développement rapide comme celui du projet.
    </p>

    <p>
      L’<strong>embedding</strong> transforme les données (ici, les fonctions) en <strong>vecteurs</strong> pour en faciliter la comparaison.
      Cela permet une <strong><a href="https://fr.wikipedia.org/wiki/Recherche_s%C3%A9mantique" target="_blank">recherche sémantique</a></strong> — basée sur le <strong>sens</strong> et non sur des mots-clés exacts — et améliore la <strong>compréhension de la demande</strong>, quelle que soit sa formulation.
    </p>

    <ImageComponent src="https://www.couchbase.com/blog/wp-content/uploads/2024/02/image1-1.png" alt="Schéma de l'architecture du projet RAG" caption="Schéma de l'embeddings"/>

    <p>
      Le choix du modèle d’embedding a été déterminant dans la qualité des résultats obtenus avec le système RAG. Mon objectif initial était d’utiliser un modèle local pour des raisons de performance (éviter des requêtes multiples) et indépendance technique.
      J’ai testé plusieurs modèles de la collection <a href="https://www.sbert.net/index.html" target="_blank">sentence-transformers</a>, comme <a href="https://www.sbert.net/docs/sentence_transformer/pretrained_models.html" target="_blank">all-mpnet-base-v2</a>, mais les résultats étaient souvent inconstants : une requête utilisateur bien formulée pouvait aboutir à une mauvaise correspondance une fois sur trois.
      Finalement, j’ai opté pour <a href="https://docs.mistral.ai/capabilities/embeddings/text_embeddings/" target="_blank">mistral-embed</a>, un modèle développé par Mistral. Celui-ci offre une robustesse supérieure, notamment sur des requêtes imprécises ou multilingues. Sa capacité à comprendre l’intention même si la formulation est vague en fait un meilleur choix dans un contexte industriel réel, où les utilisateurs peuvent exprimer leurs besoins de manière non technique.
    </p>

    <p>
      Voici le <strong>schéma de l’architecture du projet en utilisant le RAG</strong>.
      Le processus est le suivant : <br>
      1. L’utilisateur envoie une requête.<br>
      2. On transforme la requête en <strong>embedding</strong>.<br>
      3. On recherche les <strong>fonctions les plus pertinentes</strong> dans la base de données, en utilisant l’<strong>embedding</strong>.<br>
      4. On envoie une requête à l’IA, qui génère du code en se basant sur ces fonctions.<br>
      5. On récupère le code Python pour CATIA généré par l’IA.
    </p>

    <ImageComponent :src="require('@/assets/images/catia_agent_schema_rag.png')" alt="Schéma de l'architecture du projet RAG" caption="Schéma de l'architecture de l'agent avec RAG" />

    <p>
      L’<strong>IA</strong> ne génère pas systématiquement tout le code : elle se concentre sur les <strong>fonctions à modifier</strong>.
      Mon programme extrait ces fonctions du code existant et les <strong>remplace uniquement si nécessaire</strong>, limitant les risques d’introduire des erreurs dans des parties non modifiées.
    </p>
    <p>
      <strong>Exemple de réponse générée</strong> :
    </p>

    <CodeBlock language="json" :code="json_output" />

    <p>
      Dans cet exemple, l’IA répond sous forme de <a href="https://fr.wikipedia.org/wiki/JavaScript_Object_Notation" target="_blank">JSON</a> avec 4 objets :<br>
      - 2 objets de type <strong>function</strong> contenant le nom de la fonction et son code ;<br>
      - 1 objet de type <strong>response</strong> contenant le message de l’IA destiné à l’utilisateur ;<br>
      - 1 objet de type <strong>import</strong> contenant les imports nécessaires à l’exécution du code généré.
    </p>
    <p>
      Ce format permet de <strong>structurer la réponse</strong> de l’IA et de faciliter son traitement par le programme.
      D’autres formats étaient possibles, comme le <strong><a href="https://fr.wikipedia.org/wiki/Extensible_Markup_Language" target="_blank">XML</a></strong>, mais le JSON est plus léger et plus facile à manipuler en Python.
    </p>
    <p>
      Il est important de noter que cette couche IA constitue avant tout un <strong>proof of concept</strong>. La démonstration technique fonctionne et a montré que l’IA est capable de produire du code pertinent basé sur des requêtes utilisateur réelles.
      Cependant, toutes les fonctionnalités de <strong>CATIA</strong> ne sont pas encore couvertes par la façade, et l’usage de l’IA repose sur des <strong>clés API</strong> nécessitant un <strong>abonnement externe</strong> à l’entreprise.
    </p>
    <p>
      Ce projet met néanmoins en évidence un <strong>besoin fort</strong> en développement logiciel au sein de l’équipe, et ouvre la voie à une intégration potentielle plus poussée de l’automatisation par IA dans les outils internes.
    </p>

    <h3>Conclusion</h3>
    <p>
      Ce projet a été une <strong>expérience extrêmement enrichissante</strong>. Il m’a permis de découvrir l’univers de la <strong>CAO</strong> tout en mobilisant mes compétences en <strong>programmation</strong> pour répondre à des problématiques concrètes.
      J’ai appris à <strong>manipuler des API complexes</strong>, à <strong>développer des interfaces ergonomiques</strong> et à <strong>intégrer des modèles d’IA</strong> dans un outil utilisé en entreprise.
    </p>
    <p>
      L’intégration de l’<strong>IA générative</strong> ouvre de <strong>nouvelles perspectives</strong> pour l’<strong>automatisation</strong> dans <strong>CATIA V5</strong>.
      Les macros développées, ainsi que l’interface, ont déjà permis un <strong>gain de temps considérable</strong> sur certaines tâches courantes. La centralisation des outils et la simplicité d’exécution permettent aux ingénieurs d’adopter ces automatisations sans effort d’apprentissage majeur.
    </p>

  </div>
</template>
