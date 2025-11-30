# **Jeu de la vie**

![Capture d'écran du simulateur](/GameOfLife/screen.png)

## **Présentation**
Une implémentation simple du célèbre ["Game of Life" (jeu de la vie de Conway)](https://fr.wikipedia.org/wiki/Jeu_de_la_vie) écrite en **Java**. L'accent est mis sur la **simulation interactive** et l'observation des [comportements émergents](https://fr.wikipedia.org/wiki/%C3%89mergence) plutôt que sur l'installation ou la configuration.

## **Pourquoi ce projet**
Le Game of Life m'intéresse parce qu'il est hypnotisant à regarder : des règles très simples peuvent produire des motifs riches et inattendus. C'est aussi un modèle mathématique notable — le jeu est [Turing-complet](https://fr.wikipedia.org/wiki/Universalit%C3%A9_de_Turing) — ce qui en fait un excellent [terrain d'expérimentation](https://fr.wikipedia.org/wiki/Automate_cellulaire) pour tester des règles alternatives et optimiser le rendu.

Sur le plan technique, ce projet m'a permis de consolider mes compétences Java (interface utilisateur, gestion d'événements) tout en travaillant sur l'ergonomie d'édition interactive et l'organisation de configurations partageables (`.lif`).

## **Technologie**
- Langage : [Java](https://fr.wikipedia.org/wiki/Java_(langage))
- Interface : simulation interactive avec édition et contrôle en temps réel

## **Points clés**
- Règles standard de Conway par défaut, facilement modifiables pour expérimenter d'autres [automates cellulaires](https://fr.wikipedia.org/wiki/Automate_cellulaire).
- **Édition interactive** : pause, modification manuelle des cellules, génération aléatoire et remise à zéro.
- **Import de configurations** au format [Life 1.06 (.lif)](https://conwaylife.com/wiki/Life_1.06) pour rejouer des scènes ou exemples fournis.

## **Contrôles**
Naviguez et interagissez avec la simulation grâce à ces commandes :

- **Clic souris** : activer/désactiver des cellules (en pause)
- **G** : afficher / cacher la grille
- **Espace** : pause / reprise
- **Flèches** : déplacer la vue
- **Molette** : zoom

## **Exemples visuels**
### Création d'un glider
Un "glider" est un motif qui se déplace en diagonale à travers la grille. Voici comment en créer un manuellement :

![Création d'un "glider"](/GameOfLife/glider_creation.gif)

### Oscillateur Pinball
Un exemple de motif oscillateur complexe importé depuis un fichier `.lif`, montrant les interactions fascinantes entre structures :

![Pinball (exemple d'oscillateur / interaction)](/GameOfLife/pinball.gif)

## **À venir**
Quelques idées et améliorations que je souhaite implémenter :

- **Règles personnalisables** depuis l'interface (édition/sauvegarde de règles et [voisinages](https://conwaylife.com/wiki/Neighbourhood)).
- **Éditeur de motifs** et bibliothèque intégrée pour organiser et partager `.lif`.
- **Undo/redo** et gestion d'historique pour faciliter l'expérimentation.
- **Accélérations** ([multi-threading](https://fr.wikipedia.org/wiki/Multitraitement), [GPU](https://fr.wikipedia.org/wiki/Processeur_graphique) ou algorithme [HashLife](https://conwaylife.com/wiki/HashLife)) pour gérer de grandes grilles, avancer de nombreux pas de simulation et améliorer les performances.

## **Pour en savoir plus**
- **Code source** : https://github.com/Quoruda/GameOfLife
- **Release** (exécutable portable) : https://github.com/Quoruda/GameOfLife/releases/tag/v1.0.0

Téléchargez l'exécutable portable depuis la release si vous souhaitez tester rapidement sans compiler. Le dépôt contient aussi les exemples `.lif` et le code source pour les curieux ou contributeurs.
