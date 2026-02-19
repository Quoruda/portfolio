# **Le Compresseur Fractal**

![Capture d'écran de l'interface](/fractal_compressor/screenshot.png)

> "Et si l'on pouvait stocker la *recette* d'une image plutôt que ses pixels ?"

## **Le Concept**

J'ai toujours été fasciné par la **beauté mathématique** et l'optimisation algorithmique. En étudiant la compression d'image, je suis tombé sur un concept qui ressemblait à de la science-fiction : la **Compression Fractale** (PIFS).

Contrairement au JPEG ou au PNG qui rejettent certaines données ou utilisent des statistiques, la compression fractale part du principe que chaque partie d'une image ressemble à une autre partie de la même image, mais à une échelle différente. C'est comme trouver une version miniature d'un nuage à l'intérieur d'un plus gros nuage.

Mon objectif était de construire un programme capable de **regarder une image** et de **découvrir de manière autonome les équations mathématiques** capables de la redessiner à partir de zéro.

## **Comment ça marche ?**

Imaginez devoir décrire un tableau à quelqu'un au téléphone.
- **Méthode traditionnelle (Bitmap) :** Vous décrivez chaque point couleur par couleur. "Le pixel 1 est rouge, le pixel 2 est rouge..." C'est interminable.
- **Méthode fractale :** Vous décrivez des relations. "Tu vois cet arbre dans le coin ? Il ressemble exactement au grand arbre au centre, mais en moitié moins grand et tourné de 90 degrés."

Mon moteur découpe l'image en milliers de petits blocs (Ranges) et fouille le reste de l'image (Domaines) pour trouver une correspondance. Il ne cherche pas une correspondance parfaite, mais une **similitude mathématique** après avoir appliqué des transformations (rotation, miroir, luminosité, contraste).

## **Le Défi : La Performance**

Le principal défaut de la compression fractale est le **temps d'encodage**. Comparer chaque bloc avec tous les autres blocs nécessite des milliards de calculs.

Pour rendre l'outil utilisable, j'ai dû optimiser agressivement :
*   **Parallélisme** : Le moteur découpe l'image en bandes et répartit la charge de travail sur tous les **cœurs du processeur** disponibles.
*   **Compilation JIT** : J'ai utilisé **[Numba](https://numba.pydata.org/)** pour compiler les fonctions Python en code machine à la volée. Cela permet aux boucles mathématiques critiques de tourner à des vitesses comparables au **C++**.
*   **Vectorisation** : Utilisation de **NumPy** pour traiter des blocs entiers de données simultanément plutôt que pixel par pixel.

## **Le Résultat**

Le résultat est une application fonctionnelle qui vous permet d'ouvrir une image et de regarder l'ordinateur "l'apprendre" en temps réel.

On peut voir le moteur trouver les correspondances, et à mesure qu'il progresse, l'image se reconstruit à partir de pures mathématiques. J'ai également conçu un format de fichier personnalisé, **`.frac`**, qui stocke ces équations en utilisant des techniques de "bit-packing" et de compression LZMA, atteignant des ratios de compression impressionnants sur les images adaptées.

> Ce projet a été une plongée profonde dans l'**optimisation**, l'**algèbre linéaire** et le **design d'interface** avec Python. Il fait le pont entre les mathématiques abstraites et l'art visuel.
