# Simulateur : Le Jeu de la Vie

> Une version interactive de la célèbre expérience mathématique de Conway, conçue pour comprendre comment créer une simulation fluide et bien organisée.

![Capture d'écran du simulateur](./GameOfLife/screen.png)

## C'est quoi le "Jeu de la Vie" ?

Ce n'est pas un jeu vidéo classique où l'on gagne ou perd. C'est une **simulation** sur une grille où chaque case est une **"cellule"** qui peut être **vivante** (colorée) ou **morte** (vide).

À chaque étape (comme le tic-tac d'une horloge), les cellules naissent ou meurent selon des [**règles de voisinage**](https://fr.wikipedia.org/wiki/Voisinage_de_Moore) très simples. Malgré cette simplicité, des **motifs complexes** et fascinants apparaissent tout seuls : des formes qui se déplacent, oscillent ou grandissent à l'infini. C'est un exemple classique d'[**automate cellulaire**](https://fr.wikipedia.org/wiki/Automate_cellulaire).

Mon objectif était de créer un programme capable de simuler ce "monde" de manière **fluide**, même avec des milliers de cellules.

## Un exemple concret : L'oscillateur Pinball

![Pinball](./GameOfLife/pinball.gif)

Pour illustrer le pouvoir de ces règles simples, prenez la structure appelée "Pinball".  Elle n'a été créée que par quelques cellules de départ, mais elle est devenue un oscillateur : une machine miniature qui répète un cycle d'interaction complexe pour toujours, sans s'éteindre ni grandir. Elle est particulièrement intéressante, car elle est composée de structures fixes qui servent de murs et de structures mobiles (comme le célèbre glider) qui rebondissent et sont réfléchies pour maintenir le cycle. Cela montre comment des règles simples peuvent mener à des comportements émergents qui n'étaient pas prévus au départ.

## Comment ça marche

Pour que l'expérience soit agréable, j'ai dû structurer le programme comme un moteur de jeu vidéo miniature :

### ⚙️ Le Moteur (Le cerveau)

* **Le rythme cardiaque** : J'ai créé une **boucle** interne qui calcule les naissances et les morts à un rythme régulier, indépendamment de la vitesse d'affichage de l'écran (le [**framerate**](https://fr.wikipedia.org/wiki/Images_par_seconde)).

* **La mémoire** : Pour que l'ordinateur ne ralentisse pas, j'ai optimisé la façon dont la grille est stockée en **mémoire**. L'accès à chaque cellule est **instantané**, ce qui permet de gérer de très grandes grilles sans ralentissement (complexité algorithmique en [**O(1)**](https://fr.wikipedia.org/wiki/Comparaison_asymptotique)).

* **Les règles** : Le programme applique scrupuleusement les règles de Conway : une cellule meurt si elle est trop seule (**sous-population**) ou trop entourée (**surpopulation**), et naît si elle a exactement 3 voisins.

### 🎨 L'Affichage (Les yeux)

* **Fluidité** : J'ai utilisé une technique appelée [**Double Buffering**](https://www.google.com/search?q=https://fr.wikipedia.org/wiki/Double_tamponnage). Imaginez que pendant que vous regardez une image, le programme dessine déjà la suivante en coulisses pour l'afficher d'un coup. Cela évite que l'image ne **scintille** ou ne saute.

* **Organisation ([MVC](https://www.google.com/search?q=https://fr.wikipedia.org/wiki/Mod%C3%A8le-vue-contr%C3%B4leur))** : J'ai séparé le code en trois parties distinctes pour respecter le pattern **Modèle-Vue-Contrôleur** :

    1.  Les **Données** (la position des cellules).

    2.  L'**Affichage** (le dessin sur l'écran).

    3.  Les **Commandes** (la souris et le clavier).

  C'est comme dans une cuisine de restaurant : le chef (données) ne fait pas le service en salle (affichage), ce qui rend tout plus efficace et maintenable.

## Importer et Créer des motifs

On peut passer des heures à observer des motifs. J'ai ajouté un système pour **importer** des créations existantes au format standard [**Life 1.06 (.lif)**](https://conwaylife.com/wiki/Life_1.06).

Le programme est capable de **parser** (lire et comprendre) ces fichiers, d'interpréter les **coordonnées** des cellules vivantes et de les placer correctement sur votre écran pour rejouer des scènes connues.

### Exemple de création : le Glider

Un "**glider**" est le motif le plus célèbre du Jeu de la Vie ; il se déplace en diagonale à travers la grille. Voici comment on peut le créer manuellement en quelques clics :

### Exemple de motif importé : Pinball

Voici "**Pinball**", un motif complexe importé. On voit bien les structures qui interagissent entre elles indéfiniment :

## Fonctionnalités

Pour l'utilisateur, tout a été pensé pour être simple :

| **Action** | **Description** |
| ----- | ----- |
| **Dessiner** | Vous pouvez cliquer pour donner vie ou tuer des cellules **manuellement**. |
| **Contrôle** | Mettez sur **pause** à tout moment pour analyser la situation ou modifier la grille tranquillement. |
| **Explorer** | Zoomez et déplacez-vous dans la grille comme sur une carte GPS (**Pan & Zoom**). |
| **Mode Aléatoire** | Remplissez la grille de manière **procédurale** (au hasard) pour voir ce qui survit au chaos. |

## Ce que j'ai appris

Ce projet m'a permis de comprendre des concepts essentiels en informatique :

* **Le Multitâche ([Concurrence](https://fr.wikipedia.org/wiki/Programmation_concurrente))** : Faire en sorte que l'ordinateur calcule l'étape suivante du jeu *en même temps* qu'il gère vos clics de souris, sans que l'application ne gèle (gestion des [**Threads**](https://fr.wikipedia.org/wiki/Thread_\(informatique\))).

* **La Propreté du Code** : En séparant bien les tâches (le "Chef" et le "Serveur"), le code est plus facile à réparer et à améliorer (**Architecture logicielle**).

* **L'Optimisation** : Apprendre à ne pas gaspiller les ressources de l'ordinateur pour garder une simulation rapide.

## Idées pour la suite

Plusieurs pistes sont envisagées pour enrichir le projet :

1.  **Règles personnalisables** : Pouvoir modifier les règles de naissance/survie et les voisinages directement depuis l'interface.

2.  **Éditeur complet** : Ajouter une bibliothèque intégrée pour organiser, sauvegarder et partager ses propres fichiers `.lif`.

3.  **Confort d'utilisation** : Ajouter des fonctions "Annuler/Refaire" (**Undo/Redo**) et un historique pour expérimenter sans peur de se tromper.

4.  **Vitesse extrême** : Utiliser des techniques avancées comme le [**Multi-threading**](https://fr.wikipedia.org/wiki/Multithreading), le calcul sur [**GPU**](https://fr.wikipedia.org/wiki/Processeur_graphique) ou l'algorithme [**HashLife**](https://en.wikipedia.org/wiki/Hashlife) pour simuler des grilles immenses et avancer beaucoup plus vite dans le temps.

## Ressources

* **Voir le code** : [GitHub - GameOfLife](https://github.com/Quoruda/GameOfLife)

* **Télécharger l'application** : [Release v1.0.0](https://github.com/Quoruda/GameOfLife/releases/tag/v1.0.0)