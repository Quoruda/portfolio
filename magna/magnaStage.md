# Stage chez MSFR

## Introduction

Durant mon stage chez **[Magna Steyr France](https://grandparis.ccibusiness.fr/msfr-magna-steyr-france)**, j'ai conçu un assistant intelligent pour **[CATIA V5](https://www.3ds.com/fr/products/catia/catia-v5)** mêlant **automatisation, interface [Python](https://fr.wikipedia.org/wiki/Python_(langage))** et **intelligence artificielle générative**.

Le but : permettre aux ingénieurs non-développeurs de créer ou adapter des **macros personnalisées** simplement, grâce à une interface graphique intuitive et un assistant IA intégré.

Le projet combine des compétences en **programmation Python**, **UX**, **[API](https://fr.wikipedia.org/wiki/Interface_de_programmation) industrielle** et **intelligence artificielle**, avec une finalité concrète : **gagner du temps**, **réduire les erreurs** et **favoriser l'autonomie** des utilisateurs dans leurs outils de travail.

## Contexte

Mon stage de **deux mois** chez **Magna Steyr France** s'est déroulé au sein d'un service technique utilisant **CATIA V5**, un logiciel de **[CAO](https://fr.wikipedia.org/wiki/Conception_assist%C3%A9e_par_ordinateur)** essentiel dans les secteurs **automobile** et **aéronautique**.

L'équipe faisait face à de nombreuses **tâches répétitives** et avait tenté plusieurs solutions de scripting ([CatScript](https://cao.centralesupelec.fr/index.php?page=scripting.htm), [VBScript](https://fr.wikipedia.org/wiki/VBScript)) sans succès, en raison de la complexité de l'environnement CATIA. Avant même ma prise de poste, ils avaient découvert la bibliothèque Python **[pycatia](https://pycatia.readthedocs.io/en/latest/)**, et c'est naturellement devenu le sujet de mon stage.

Mon rôle a donc consisté à explorer pycatia, à évaluer ses capacités pour automatiser efficacement les tâches, puis à développer une solution robuste. Rapidement, le projet a évolué vers la conception d'une **interface graphique** centralisée et l'intégration d'une **[IA générative](https://fr.wikipedia.org/wiki/Intelligence_artificielle_g%C3%A9n%C3%A9rative)**, afin de rendre la création et la modification de macros accessibles aux ingénieurs non-développeurs.

## Prise en main

J'ai d'abord dû me familiariser avec l'**environnement CAO**, un domaine doté de ses propres **concepts** et **terminologies**. Pour expérimenter avec **pycatia** et observer les effets du code, j'ai utilisé **[Jupyter Notebook](https://jupyter.org/)**, un environnement interactif idéal pour exécuter et tester du code Python par cellules.

![Vidéo démonstration de Jupyter Notebook](/magna/jupyter_notebook_demo.mp4)
*Vidéo démonstration de Jupyter Notebook*

J'ai commencé par développer des **macros simples**, puis conçu une **interface graphique** servant de **bibliothèque de macros**, permettant aux utilisateurs de les exécuter facilement. Cette interface a été développée avec **Tkinter** et permet de lancer et configurer les macros de manière intuitive.

Le choix de **Tkinter** s'explique par sa simplicité d'intégration et sa légèreté. Contrairement à des bibliothèques comme **[PyQt](https://fr.wikipedia.org/wiki/PyQt)**, Tkinter est inclus par défaut dans Python, ce qui facilite le déploiement de l'application sans avoir à gérer de dépendances supplémentaires. Bien que plus basique en termes de rendu graphique, il offre suffisamment de souplesse pour créer une interface claire, fonctionnelle et maintenable. Étant donné que l'objectif était de concevoir un outil rapidement opérationnel et facile à transmettre, Tkinter constituait le choix le plus pragmatique dans le contexte du stage.

![Capture d'écran de l'application](/magna/catia_app_v2.png)
*Capture d'écran de la bibliothèque de macro*

## Un nouvel objectif

Au fil du stage, je me suis rendu compte que, même si les macros développées étaient utiles, il serait difficile d'en produire suffisamment pour répondre à tous les besoins. En l'absence de développeurs, la **maintenance** et l'**évolution** du projet seraient également compliquées après mon départ.

C'est alors que m'est venue l'idée de créer une **[façade](https://refactoring.guru/fr/design-patterns/facade) pour pycatia** : **une [couche d'abstraction](https://fr.wikipedia.org/wiki/Abstraction_(informatique)) simplifiée** permettant aux ingénieurs de créer leurs propres macros plus facilement. Bien qu'une certaine base en **programmation** reste nécessaire, cette approche réduit considérablement la **complexité** et limite les risques d'**erreurs**.

Dans cet exemple montrant des fonctions pycatia, on peut voir que les valeurs définissant la propriété de couleur sont inversées entre la fonction de récupération et celle de modification.  
C'est un petit détail qui peut rapidement devenir source d'erreurs, surtout s'il ne s'agit pas de la seule exception présentant ce type de problème.
```python
# récupérer la couleur
get_real_color() -> (inheritance: int, red: int, green: int, blue: int)
# modifier la couleur
set_real_color(red: int, green: int, blue: int, inheritance: int)
```

Les deux codes suivants montrent la différence entre une utilisation directe de pycatia et l'utilisation avec la façade.
```python
# pycatia
caa = catia()
document = caa.active_document
part = document.part
bodies = part.bodies
selection = caa.active_window.selection
selection.clear()
for body in bodies:
    selection.add(body)
selection.vis_properties.set_real_color(255, 0, 0, 0)
selection.clear()
```
```python
# façade
part = get_active_part()
bodies = get_bodies_of_part(part)
set_color(bodies, (255, 0, 0, 0))
```

On remarque que le code utilisant pycatia nécessite de préparer la sélection avant de pouvoir modifier la couleur, alors que la façade permet de modifier directement les corps sans avoir à gérer la sélection.

## Ajout d'une couche IA

En développant la façade, une nouvelle idée a émergé : pourquoi ne pas exploiter l'**IA générative** pour produire du code fonctionnel à partir de cette façade ? Jusqu'alors, les tentatives d'utilisation de l'IA pour interagir avec **CATIA V5** s'étaient soldées par des échecs, notamment à cause de la **complexité de son API**. Cependant, une **bibliothèque simplifiée** pourrait améliorer la **pertinence** du code généré.

En fournissant à l'IA un **prompt** détaillant son rôle et les **fonctions disponibles** dans la façade, j'ai obtenu de **bons résultats**. J'ai donc intégré cette IA à l'application, sous la forme d'une **macro interactive** répondant directement aux demandes des utilisateurs.

![Vidéo démonstration de l'IA interactive](/magna/ia_interactive_demo.mp4)
*Vidéo démonstration de l'IA interactive*

Cette fonctionnalité démontre qu'une **IA peut générer du code pertinent**, ouvrant la voie à de nouvelles formes d'**automatisation** dans **CATIA V5**. Toutefois, l'IA reste imparfaite : elle peut mal interpréter une demande ou générer du code erroné. C'est pourquoi j'ai choisi d'en faire un **assistant à la création de macros**, qui ne permet l'exécution ou la sauvegarde du code que s'il est **valide**.

![Capture d'écran de l'application](/magna/catia_app_v3.png)
*Capture d'écran de l'éditeur de macro*

Grâce à cette interface, les utilisateurs peuvent interagir avec l'**IA** pour **créer ou modifier des macros**. Elle se compose de deux zones principales :  
– La partie gauche est dédiée au **code**, avec un **éditeur Python**, des boutons d'**exécution**, de **sauvegarde** et d'**importation**, ainsi qu'un affichage des fonctions disponibles.  
– La partie droite est réservée à l'**IA**, avec un **éditeur de texte** pour la conversation et des **prompts prédéfinis**.

**Exemple** : un utilisateur demande à l'IA de créer une macro générant une **capture d'écran** pour chaque pièce, afin d'utiliser les images dans un document.

![Vidéo démonstration de création macro](/magna/ia_creation_macro_spielberg.mp4)
*Vidéo démonstration de création macro*

## À propos de l'IA

L'IA utilisée s'appuie sur un modèle développé par l'entreprise française **[Mistral AI](https://fr.wikipedia.org/wiki/Mistral_AI)**, spécialisée dans les **modèles open-source**. Elle fournit des **clés API gratuites**, idéales pour les phases de test.

Plusieurs modèles ont été testés. J'ai d'abord utilisé **[Codestral](https://mistral.ai/fr/news/codestral)**, un modèle spécialisé dans le code, rapidement remplacé par son successeur **[Devstral](https://mistral.ai/fr/news/devstral)**. Finalement, c'est **[Mistral-small](https://mistral.ai/news/mistral-small-3-1)**, un modèle **généraliste**, qui s'est révélé le plus performant, notamment pour **comprendre les demandes**, **proposer des solutions** et **générer du code fiable**.

Voici le **schéma de l'architecture initiale** du projet : l'utilisateur envoie une requête, l'IA génère du code utilisant la façade **pycatia**, puis ce code est exécuté dans **CATIA V5**.

![Schéma de l'architecture du projet](/magna/catia_agent_schema.png)
*Schéma de l'architecture de l'agent sans RAG*

Cette première version avait une limite : la façade contenait **trop de fonctions**, rendant leur utilisation par l'IA **aléatoire** ou **incorrecte**.

Pour pallier cela, j'ai implémenté une architecture fondée sur le principe du **[RAG (Retrieval-Augmented Generation)](https://datascientest.com/retrieval-augmented-generation-tout-savoir)**. Grâce à l'**[embedding](https://generationia.flint.media/p/c-est-quoi-un-embedding)**, le système sélectionne automatiquement les **fonctions les plus pertinentes** à partir de la requête utilisateur, réduisant drastiquement les erreurs.

J'ai fait le choix d'un système **RAG** plutôt que d'un **[fine-tuning](https://datascientest.com/fine-tuning-tout-savoir)** de modèle, principalement pour des raisons de **temps**, de **ressources** et de **quantité de données disponibles**. Le fine-tuning aurait nécessité un corpus conséquent d'exemples annotés, ainsi qu'un environnement technique adapté à l'entraînement de modèles. Ce n'était pas compatible avec les contraintes du stage. À l'inverse, le RAG permet de s'appuyer sur un **modèle préexistant** tout en adaptant dynamiquement ses réponses via une base de connaissances.

Cette approche présente également l'avantage d'être **facilement maintenable** : la mise à jour ou l'ajout de fonctions dans la base ne nécessite pas de réentraîner un modèle. C'est donc une solution souple, efficace et bien plus adaptée à un contexte de développement rapide comme celui du projet.

L'**embedding** transforme les données (ici, les fonctions) en **vecteurs** pour en faciliter la comparaison. Cela permet une **[recherche sémantique](https://fr.wikipedia.org/wiki/Recherche_s%C3%A9mantique)** basée sur le **sens** et non sur des mots-clés exacts — et améliore la **compréhension de la demande**, quelle que soit sa formulation.

![Schéma de l'architecture du projet RAG](https://www.couchbase.com/blog/wp-content/uploads/2024/02/image1-1.png)
*Schéma de l'embeddings*

Le choix du modèle d'embedding a été déterminant dans la qualité des résultats obtenus avec le système RAG. Mon objectif initial était d'utiliser un modèle local pour des raisons de performance (éviter des requêtes multiples) et indépendance technique. J'ai testé plusieurs modèles de la collection [sentence-transformers](https://www.sbert.net/index.html), comme [all-mpnet-base-v2](https://www.sbert.net/docs/sentence_transformer/pretrained_models.html), mais les résultats étaient souvent inconstants : une requête utilisateur bien formulée pouvait aboutir à une mauvaise correspondance une fois sur trois. Finalement, j'ai opté pour [mistral-embed](https://docs.mistral.ai/capabilities/embeddings/text_embeddings/), un modèle développé par Mistral. Celui-ci offre une robustesse supérieure, notamment sur des requêtes imprécises ou multilingues. Sa capacité à comprendre l'intention même si la formulation est vague en fait un meilleur choix dans un contexte industriel réel, où les utilisateurs peuvent exprimer leurs besoins de manière non technique.

Voici le **schéma de l'architecture du projet en utilisant le RAG**. Le processus est le suivant :
1. L'utilisateur envoie une requête.
2. On transforme la requête en **embedding**.
3. On recherche les **fonctions les plus pertinentes** dans la base de données, en utilisant l'**embedding**.
4. On envoie une requête à l'IA, qui génère du code en se basant sur ces fonctions.
5. On récupère le code Python pour CATIA généré par l'IA.

![Schéma de l'architecture du projet RAG](/magna/catia_agent_schema_rag.png)
*Schéma de l'architecture de l'agent avec RAG*

L'**IA** ne génère pas systématiquement tout le code : elle se concentre sur les **fonctions à modifier**. Mon programme extrait ces fonctions du code existant et les **remplace uniquement si nécessaire**, limitant les risques d'introduire des erreurs dans des parties non modifiées.

**Exemple de réponse générée** :
```json
[
  {
    "type": "import",
    "name": "os",
    "content": "import os"
  },
  {
    "type": "function",
    "name": "take_and_save_screenshot",
    "content": "def take_and_save_screenshot():\n    screenshot = app.take_screenshot()\n    download_path = os.path.join(os.path.expanduser('~'), 'Downloads')\n    screenshot_path = os.path.join(download_path, 'capture_ecran.png')\n    screenshot.save(screenshot_path)\n    app.wait_confirmation(f\"La capture d'écran a été enregistrée dans votre dossier de téléchargement sous le nom 'capture_ecran.png'.\")\n"
  },
  {
    "type": "function",
    "name": "main",
    "content": "def main():\n    take_and_save_screenshot()\n"
  },
  {
    "type": "response",
    "name": "info",
    "content": "J'ai créé une macro qui prend une capture d'écran et l'enregistre dans votre dossier de téléchargement sous le nom 'capture_ecran.png'. La macro est prête à être exécutée."
  }
]
```

Dans cet exemple, l'IA répond sous forme de [JSON](https://fr.wikipedia.org/wiki/JavaScript_Object_Notation) avec 4 objets :
- 2 objets de type **function** contenant le nom de la fonction et son code ;
- 1 objet de type **response** contenant le message de l'IA destiné à l'utilisateur ;
- 1 objet de type **import** contenant les imports nécessaires à l'exécution du code généré.

Ce format permet de **structurer la réponse** de l'IA et de faciliter son traitement par le programme. D'autres formats étaient possibles, comme le **[XML](https://fr.wikipedia.org/wiki/Extensible_Markup_Language)**, mais le JSON est plus léger et plus facile à manipuler en Python.

Il est important de noter que cette couche IA constitue avant tout un **proof of concept**. La démonstration technique fonctionne et a montré que l'IA est capable de produire du code pertinent basé sur des requêtes utilisateur réelles. Cependant, toutes les fonctionnalités de **CATIA** ne sont pas encore couvertes par la façade, et l'usage de l'IA repose sur des **clés API** nécessitant un **abonnement externe** à l'entreprise.

Ce projet met néanmoins en évidence un **besoin fort** en développement logiciel au sein de l'équipe, et ouvre la voie à une intégration potentielle plus poussée de l'automatisation par IA dans les outils internes.

## Conclusion

Ce projet a été une **expérience extrêmement enrichissante**. Il m'a permis de découvrir l'univers de la **CAO** tout en mobilisant mes compétences en **programmation** pour répondre à des problématiques concrètes. J'ai appris à **manipuler des API complexes**, à **développer des interfaces ergonomiques** et à **intégrer des modèles d'IA** dans un outil utilisé en entreprise.

L'intégration de l'**IA générative** ouvre de **nouvelles perspectives** pour l'**automatisation** dans **CATIA V5**. Les macros développées, ainsi que l'interface, ont déjà permis un **gain de temps considérable** sur certaines tâches courantes. La centralisation des outils et la simplicité d'exécution permettent aux ingénieurs d'adopter ces automatisations sans effort d'apprentissage majeur.