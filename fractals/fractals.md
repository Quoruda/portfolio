# Visualisateur de Fractales

## Introduction
J'ai toujours été fasciné par les [fractales](https://fr.wikipedia.org/wiki/Fractale), ces structures mathématiques infiniment complexes qui se répètent à différentes échelles.
Pour une meilleure accessibilité et visualisation, j'ai décidé de créer un visualisateur de fractales en utilisant des technologies web modernes.
Ce projet permet aux utilisateurs d'explorer différentes fractales, de zoomer et de modifier les paramètres pour voir comment elles changent.

![Exemple de fractale générique](fractals/fractal.png)


Le visualisateur de fractales est accessible en ligne sur [https://quoruda.github.io/FractalViewer/](https://quoruda.github.io/FractalViewer/) ou via l'application dédiée sur mon portfolio.

Le code source complet du projet est disponible sur [GitHub](https://github.com/Quoruda/FractalViewer) pour toute personne souhaitant explorer l'implémentation ou contribuer.

## Technologies Utilisées
Ce projet est développé en [Vue.js 3](https://vuejs.org/), un framework JavaScript progressif pour construire des interfaces utilisateur modernes.
Pour le rendu des fractales, j'utilise [WebGL](https://developer.mozilla.org/fr/docs/Web/API/WebGL_API) car il permet de tirer parti de la puissance de la carte graphique.
Pourquoi utiliser la carte graphique ? Parce que le calcul des fractales peut être très intensif en ressources, et que les [GPU](https://fr.wikipedia.org/wiki/Processeur_graphique) sont conçus pour gérer des calculs parallèles de manière efficace ce qui est parfait pour ce type de rendu.
Ce choix a cependant un inconvénient majeur : la précision de WebGL est limitée à 32 bits (~7 chiffres significatifs), ce qui peut poser problème lors de zooms très profonds dans les fractales.

La prise en charge de la [double précision (64 bits)](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) (~15-17 chiffres significatifs) n'est pas encore universelle dans les navigateurs web, bien que certains commencent à l'implémenter.
Cela pourrait être une amélioration future pour ce projet, permettant de voir jusqu'à quel point on peut zoomer dans les fractales sans perdre de détails.

## Fractales implémentées

### Ensemble de Julia

![Ensemble de Julia](/fractals/julia.gif)

L'[ensemble de Julia](https://fr.wikipedia.org/wiki/Ensemble_de_Julia) est une large famille de fractales provenant d'une suite mathématique plutôt simple.
Chaque point du plan complexe est itéré selon la formule \( z_{n+1} = z_n^2 + c \), où \( c \) et \( z_0 \) sont des nombres complexes.

Pour chaque pixel de l'image, j'utilise sa position pour définir la valeur initiale \( z_0 \).
J'itère ensuite la formule un certain nombre de fois. Si la valeur de \( z_n \) dépasse une certaine limite (généralement 2), je considère que le point "s'échappe" vers l'infini.
Le nombre d'itérations avant que le point n'échappe est utilisé pour déterminer la couleur du pixel.
Si le point n'échappe pas après un nombre maximal d'itérations, il est considéré comme faisant partie de l'ensemble et est coloré en noir.

### Ensemble de Mandelbrot

![Ensemble de Mandelbrot](/fractals/mandelbrot.png)

L'[ensemble de Mandelbrot](https://fr.wikipedia.org/wiki/Ensemble_de_Mandelbrot) est une fractale célèbre qui est définie par une règle similaire à celle de l'ensemble de Julia, mais avec une différence clé qui permet de se comporter comme un résumé de tous les ensembles de Julia.
\(c\) est maintenant la position du pixel ce qui permet de tester les configurations de Julia pour chaque point du plan.
\(z_0\) est toujours initialisé à 0, car il a été prouvé que si dans un ensemble de Julia, il y a un point qui échappe, alors \(z_0 = 0\) échappe aussi.

Après le processus d'itération similaire à celui de l'ensemble de Julia.
Il n'y a pas de paramètre \(c\) à ajuster mais cela ne la rend pas moins intéressante à explorer.
Au contraire, l'ensemble de Mandelbrot est souvent considéré comme une carte des ensembles de Julia, chaque point de l'ensemble de Mandelbrot correspondant à un ensemble de Julia spécifique.
Cela peut se remarquer à plusieurs endroits dans l'ensemble de Mandelbrot où des structures similaires aux ensembles de Julia apparaissent. Et ces régions se trouvent généralement aux coordonnées correspondant aux valeurs de \(c\) pour lesquelles les ensembles de Julia sont connectés.

### Ensemble de Burning Ship

![Ensemble de Burning Ship](/fractals/burningship.png)

L'[ensemble de Burning Ship](https://en.wikipedia.org/wiki/Burning_Ship_fractal) est une fractale moins connue mais tout aussi fascinante.
Il est défini par une itération similaire à celle de l'ensemble de Mandelbrot, mais avec une modification dans la manière dont les valeurs sont manipulées.
Je récupère la valeur absolue des parties réelles et imaginaires de \(z_n\) avant de regarder si le point échappe.
Cette modification crée des motifs qui ressemblent à des navires en feu, d'où le nom "Burning Ship".
L'utilisation de la valeur absolue brise la symétrie de la fractale de Mandelbrot et crée des structures asymétriques et turbulentes qui évoquent effectivement des flammes.

### Mandelbox
La [Mandelbox](https://en.wikipedia.org/wiki/Mandelbox) est une fractale 3D fascinante découverte en 2010, qui étend le concept des ensembles de Mandelbrot et Julia dans l'espace tridimensionnel.
Contrairement aux fractales précédentes qui sont définies dans le plan complexe 2D, la Mandelbox utilise des vecteurs 3D et une itération basée sur des transformations géométriques.

La formule itérative est définie comme : \( v_{n+1} = f(v_n) + c \), où \( f \) applique une série de transformations à chaque itération.
Ces transformations incluent une "boîte de repliement" (box folding) qui replie l'espace autour d'un cube, suivie d'une mise à l'échelle.
Le paramètre \( c \) contrôle l'intensité de ces transformations et détermine si un point reste borné ou s'échappe vers l'infini.

Pour visualiser cette fractale 3D complexe, j'utilise le [ray marching](https://en.wikipedia.org/wiki/Ray_marching), une technique de rendu différente de celle des fractales 2D.
Au lieu de tester simplement si chaque pixel "échappe", le ray marching envoie des rayons depuis la caméra à travers chaque pixel et les avance progressivement dans la scène.
À chaque étape, je calcule la distance minimale jusqu'à la surface de la Mandelbox en utilisant l'itération mentionnée ci-dessus.
Lorsque la distance devient suffisamment petite, je considère que le rayon a touché la surface et j'arrête l'avancée.
Cette approche permet de capturer la géométrie complexe et l'auto-similitude remarquable de la Mandelbox en trois dimensions.

Le ray marching offre aussi l'avantage de pouvoir explorer la Mandelbox sous tous les angles, contrairement aux projections 2D des autres fractales.
Cependant, cette technique est plus exigeante en calcul et nécessite plus d'itérations pour produire des images de qualité.

![Mandelbox 3D](fractals/mandelbox.png)

## Améliorations futures
Plusieurs optimisations et extensions pourraient enrichir ce visualisateur :

**Précision étendue** : Implémenter la [double précision (64 bits)](https://en.wikipedia.org/wiki/Double-precision_floating-point_format) une fois que le support [WebGL2](https://developer.mozilla.org/fr/docs/Web/API/WebGL2RenderingContext) sera plus universel dans les navigateurs, permettant des zooms infiniment profonds sans perte de détails.

**Palettes de couleurs personnalisées** : Permettre aux utilisateurs de créer et d'importer leurs propres palettes de couleurs pour une exploration artistique plus libre.

**Animation et interpolation** : Ajouter la possibilité d'enregistrer des "parcours" à travers les fractales avec animations fluides, créant ainsi des vidéos explorant les détails fractals.

**Performance WebGPU** : Migrer de WebGL à [WebGPU](https://developer.mozilla.org/fr/docs/Web/API/WebGPU_API) lorsque celui-ci sera plus stable, offrant de meilleures performances et une meilleure compatibilité cross-platform.

**Plus de fractales 3D** : Implémenter d'autres fractales 3D comme le [Mandelbulb](https://en.wikipedia.org/wiki/Mandelbulb) ou les fractales de Julia 3D pour enrichir l'expérience d'exploration.

**Export et partage** : Permettre aux utilisateurs d'exporter des images haute résolution et de partager les paramètres de leurs découvertes avec la communauté.

## Sources d'inspiration

Ce projet n'aurait pas vu le jour sans les travaux et contenus éducatifs exceptionnels qui m'ont inspiré et guidé dans ma compréhension des fractales et des techniques de rendu.

**Vidéos**

La playlist [Fractals Rendering](https://www.youtube.com/watch?v=wUlVFYJIUNA&list=PLrhTDP0yvIGI92NOZFmYu8D_gslk0eD-x) de [DimensionCode](https://www.youtube.com/@DimensionCode) est excellente pour découvrir les fractales 2D. Cette chaîne excelle dans la vulgarisation et rend les concepts complexes accessibles. J'ai puisé dans ses explications pour mieux comprendre les ensembles de Julia, Mandelbrot et Burning Ship.

Pour les techniques de rendu avancées, je me suis largement appuyé sur la chaîne [Quantale](https://www.youtube.com/@QuantaleVideo). Ses vidéos sont plus complexes mais extrêmement complètes :

- [Ray Marching](https://www.youtube.com/watch?v=K9yrtyLKysA) : Une introduction détaillée à la technique de ray marching, essentielle pour comprendre le rendu de fractales 3D.

- [Fragment Shaders & OpenGL](https://www.youtube.com/watch?v=_IV8gUD6LTY&t=411s) : Une explication approfondie des shaders et de leur fonctionnement, qui m'a aidé à implémenter efficacement mes fractales en WebGL.

- [3D Fractals](https://www.youtube.com/watch?v=cTTgjHF-8r4) : Une exploration des fractales 3D et de leurs propriétés, particulièrement utile pour la Mandelbox.

**Articles et ressources**

[Wikipedia - Mandelbox](https://en.wikipedia.org/wiki/Mandelbox) m'a fourni les formules mathématiques précises et détaillées nécessaires pour implémenter correctement la Mandelbox.

**Remerciements**

Je remercie les créateurs de contenu éducatif, en particulier DimensionCode et Quantale, ainsi que la communauté des passionnés de fractales et de mathématiques visuelles pour avoir partagé leurs connaissances et créations, rendant possible des projets comme celui-ci.