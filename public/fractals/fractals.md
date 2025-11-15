# Visualisateur de Fractales

## Introduction
J'ai toujours été fasciné par les fractales, ces structures mathématiques infiniment complexes qui se répètent à différentes échelles.
Pour une meilleure accessibilité et visualisation, j'ai décidé de créer un visualisateur de fractales en utilisant des technologies web modernes.
Ce projet permet aux utilisateurs d'explorer différentes fractales, de zoomer et de modifier les paramètres pour voir comment elles changent.

## Technologies Utilisées
Ce projet est développé en Vue.js 3, un framework JavaScript progressif pour construire des interfaces utilisateur modernes.
Pour le rendu des fractales, j'utilise l'outil WebGL car il permet de tirer parti de la puissance de la carte graphique.
Pourquoi utiliser la carte graphique ? Parce que le calcul des fractales peut être très intensif en ressources, et que les GPU sont conçus pour gérer des calculs parallèles de manière efficace ce qui est parfait pour ce type de rendu.
Ce choix a cependant un inconvénient majeur : la précision de WebGL est limitée à 32 bits (~7 chiffres significatifs), ce qui peut poser problème lors de zooms très profonds dans les fractales.

La prise en charge du 64 bits (~15-17 chiffres significatifs) n'est pas encore universelle dans les navigateurs web, bien que certains commencent à l'implémenter.
Cela pourrait être une amélioration future pour ce projet, permettant de grandement à quelle point on peut zoomer dans les fractales sans perdre de détails.

## Fractales implémentées

### Ensemble de Julia
L'ensemble de Julia est une large famille de fractales provient d'une suite mathématique plutot simple.
Chaque point du plan complexe est itéré selon la formule \( z_{n+1} = z_n^2 + c \), où \( c \) et \( z_0 \) sont des nombres complexes.

Pour chaque pixel de l'image, on utilise sa position pour définir la valeur initiale \( z_0 \).
On itère ensuite la formule un certain nombre de fois. Si la valeur de \( z_n \) dépasse une certaine limite (généralement 2), on considère que le point "s'échappe" vers l'infini.
Le nombre d'itérations avant que le point n'échappe est utilisé pour déterminer la couleur du pixel.
Si le point n'échappe pas après un nombre maximal d'itérations, il est considéré comme faisant partie de l'ensemble et est coloré en noir.

### Ensemble de Mandelbrot
L'ensemble de Mandelbrot est une fractale célèbre qui est définie par une règle similaire à celle de l'ensemble de Julia, mais avec une différence clé qui permet de se comporter comme un résumé de tous les ensembles de Julia.
\(c\) est maintenant la position du pixel ce qui permet de tester les configurations de Julia pour chaque point du plan.
\(z_0\) est toujours initialisé à 0, car il a été prouvé que si dans un ensemble de Julia, il y a un point qui échappe, alors \(z_0 = 0\) échappe aussi.

Apès le processus d'itération similaire à celui de l'ensemble de Julia.
Il n'y a pas de paramètre \(c\) à ajuster mais cela ne la rend pas moins intéressante à explorer.
Au contraire, l'ensemble de Mandelbrot est souvent considéré comme une carte des ensembles de Julia, chaque point de l'ensemble de Mandelbrot correspondant à un ensemble de Julia spécifique.
Cela peut se remarquer à plusieurs endroits dans l'ensemble de Mandelbrot où des structures similaires aux ensembles de Julia apparaissent. Et ces régions se trouvent généralement aux coordonnées correspondant aux valeurs de \(c\) pour lesquelles les ensembles de Julia sont connectés.

### Ensemble de Burning Ship
L'ensemble de Burning Ship est une fractale moins connue mais tout aussi fascinante.
Il est défini par une itération similaire à celle de l'ensemble de Mandelbrot, mais avec une modification dans la manière dont les valeurs sont manipulées.
On récupére la valeur absolue des parties réelles et imaginaires de \(z_n\) avant de regarder si le point échappe.
Cette modification crée des motifs qui ressemblent à des navires en feu, d'où le nom "Burning Ship".





