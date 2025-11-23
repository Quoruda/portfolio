# Jeu de la vie

![Capture d'écran du simulateur](screen.png)

## Présentation
Une implémentation simple du célèbre ["Game of Life" (jeu de la vie de Conway)](https://fr.wikipedia.org/wiki/Jeu_de_la_vie) écrite en Java. L'accent est mis sur la simulation interactive et l'observation des [comportements émergents](https://fr.wikipedia.org/wiki/%C3%89mergence) plutôt que sur l'installation ou la configuration.

## Pourquoi ce projet
Le Game of Life m'intéresse parce qu'il est hypnotisant à regarder : des règles très simples peuvent produire des motifs riches et inattendus. C'est aussi un modèle mathématique notable (le jeu est [Turing-complet](https://fr.wikipedia.org/wiki/Universalit%C3%A9_de_Turing)), ce qui en fait un [terrain d'expérimentation](https://fr.wikipedia.org/wiki/Automate_cellulaire) stimulant pour tester des règles alternatives, travailler l'ergonomie d'édition en temps réel et optimiser le rendu. Sur le plan technique, le projet m'a permis de consolider mes compétences Java ([interface utilisateur](https://fr.wikipedia.org/wiki/Interface_utilisateur), [gestion d'événements](https://fr.wikipedia.org/wiki/Programmation_%C3%A9v%C3%A9nementielle)) et d'organiser des exemples partageables (`.lif`).

## Technologie
- Langage : [Java](https://fr.wikipedia.org/wiki/Java_(langage))
- Interface : simulation interactive (édition et contrôle en temps réel)

## Points clés
- Règles standard de Conway par défaut, facilement modifiables pour expérimenter d'autres [automates cellulaires](https://fr.wikipedia.org/wiki/Automate_cellulaire).
- Édition en temps réel : pause, modification manuelle des cellules, génération aléatoire et remise à zéro.
- Import de configurations au format [Life 1.06 (`.lif`)](https://conwaylife.com/wiki/Life_1.06) pour rejouer des scènes ou exemples fournis.

## Contrôles
- G : afficher / cacher la grille
- Espace : pause / reprise
- Flèches : déplacer la vue
- Molette : zoom

## Aperçu
Cliquez sur la grille (lorsque la simulation est en pause) pour activer/désactiver des cellules.

![Création d'un "glider"](glider_creation.gif)

![Pinball (exemple d'oscillateur / interaction)](pinball.gif)

## À venir
Quelques idées et améliorations que je souhaite implémenter :

- Règles personnalisables depuis l'interface (édition/sauvegarde de règles et [voisinages](https://conwaylife.com/wiki/Neighbourhood)).
- Éditeur de motifs et bibliothèque intégrée pour organiser et partager `.lif`.
- Undo/redo et gestion d'historique pour faciliter l'expérimentation.
- Accélérations ([multi-threading](https://fr.wikipedia.org/wiki/Multitraitement), [GPU](https://fr.wikipedia.org/wiki/Processeur_graphique) ou algorithme [HashLife](https://conwaylife.com/wiki/HashLife)) pour gérer de grandes grilles, avancer de nombreux pas de simulation et améliorer les performances.

## Pour en savoir plus
- Code source : https://github.com/Quoruda/GameOfLife
- Release (exécutable portable) : https://github.com/Quoruda/GameOfLife/releases/tag/v1.0.0

Téléchargez l'exécutable portable depuis la release si vous souhaitez tester rapidement sans compiler. Le dépôt contient aussi les exemples `.lif` et le code source pour les curieux ou contributeurs.
