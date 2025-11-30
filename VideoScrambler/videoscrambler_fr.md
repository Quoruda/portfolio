# Video Scrambler

![Capture d'écran de l'application](/VideoScrambler/screenshot.png)

Ceci est un projet universitaire réalisé en Java visant à implémenter un système de chiffrement et de déchiffrement vidéo basé sur des techniques d'échange de lignes. Le but principal est de protéger le contenu vidéo contre les accès non autorisés en rendant la vidéo illisible sans la clé appropriée.

## Contexte Historique

Dans les années 80/90, les systèmes de télévision payante utilisaient des techniques de chiffrement analogique simples mais efficaces pour protéger leur contenu. En raison des capacités de traitement limitées des décodeurs de l'époque, le chiffrement reposait sur le mélange des lignes d'images - une méthode élégante qui nécessitait peu de puissance de calcul pour être déchiffrée.

## Technologies Utilisées
- Langage : Java
- Interface : JavaFX pour l'interface utilisateur graphique
- Traitement Vidéo : OpenCV pour la manipulation des flux vidéo et traitement d'images

## Principe de Fonctionnement

### Algorithme de Chiffrement

Le système utilise une permutation des lignes de chaque image basée sur une clé de chiffrement symétrique composée de deux paramètres :
- `r` (offset) : un décalage codé sur 8 bits
- `s` (step) : un pas codé sur 7 bits

Pour une ligne d'indice `idLigne`, sa nouvelle position après chiffrement est : `(r + (2s+1) × idLigne) % size`

#### Traitement par Itérations

Pour gérer toutes les hauteurs d'image (pas nécessairement des puissances de 2), l'algorithme procède par itérations successives :
1. Itération #1 : traitement des lignes 0 à 2^n-1 (où 2^n est la plus grande puissance de 2 ≤ hauteur)
2. Itération #2 : traitement du résidu suivant
3. Itérations suivantes : jusqu'à traiter toutes les lignes

Cette approche crée un effet visuel distinctif où le haut de l'image est fortement brouillé tandis que le bas l'est progressivement moins.

### Déchiffrement avec Clé

Lorsque la clé est connue, le déchiffrement est trivial : il suffit d'inverser la permutation des lignes. Avec les capacités de calcul actuelles, cela peut se faire en temps réel.

## Fonctionnalités Implémentées

### Étape 1 : Chiffrement/Déchiffrement de Base
- Lecture et écriture de fichiers vidéo
- Chiffrement des lignes image par image
- Déchiffrement avec clé connue
- Visualisation simultanée de deux vidéos côte à côte dans l'interface JavaFX
- Gestion de la clé via ligne de commande ou fichier texte
- Affichage de la clé dans l'interface utilisateur

### Étape 2 : Cassage de Clé par Force Brute

Il y a 2^15 = 32 768 clés possibles (8 bits pour r et 7 bits pour s). Le cassage de clé consiste à tester toutes les combinaisons possibles et à évaluer la qualité du déchiffrement obtenu.

Le principe est de tester chaque clé, déchiffrer la vidéo, puis évaluer la "qualité" de l'image déchiffrée à l'aide d'un critère de sélection.
La clé qui maximise ce critère est considérée comme la clé correcte.

32 768 essais reste abordable pour les ordinateurs modernes, permettant un cassage en quelques minutes.
Cependant, j'ai réussi à optimiser le processus pour atteindre un temps de cassage en quelques secondes grâce à une observation personnelle que j'ai eue en jouant avec les clés.

#### Observation Clé

Parmi les deux paramètres de la clé, `s` (le pas) a un impact plus significatif sur le mélange des lignes que `r` (l'offset). En effet, `s` détermine la "distance" entre les lignes échangées, tandis que `r` ne fait que décaler cette permutation.
Ce que cela signifie en pratique, c'est que si on trouve la bonne valeur de `s`, le contenu de l'image devient compréhensible à l'œil quelle que soit la valeur de `r`.

Ainsi, j'ai pu réduire le nombre d'essais nécessaires en deux étapes :
1. Trouver le bon `s` : tester les 128 valeurs possibles de `s` avec r=0, et sélectionner le meilleur selon le critère de sélection.
2. Trouver le bon `r` : une fois `s` connu, tester les 256 valeurs possibles de `r` pour ce `s` et sélectionner la meilleure.
3. Combinaison finale : la clé finale est la combinaison des meilleurs `r` et `s` trouvés.

Cela réduit le nombre d'essais de 32 768 à seulement 384, accélérant considérablement le processus de cassage.

#### Critères de Sélection Implémentés

1. Distance Euclidienne
```
d(x,y) = √(Σ(xi - yi)²)
```
Mesure la différence pixel par pixel entre deux lignes consécutives.

2. Corrélation de Pearson
```
ρ(x,y) = Σ(xi-x̄)(yi-ȳ) / √(Σ(xi-x̄)²) × √(Σ(yi-ȳ)²)
```
Plus robuste aux variations d'éclairage, normalise automatiquement les données.

Le principe : dans une image correctement déchiffrée, les lignes consécutives sont très similaires. Le score global est la somme des similarités de toutes les paires de lignes adjacentes.

C'est donc ce critère que j'ai choisi pour évaluer chaque clé testée lors du cassage.
 
### Étape 3 : Clé Dynamique Embarquée
- 🔐 Changement de clé périodique ou aléatoire en cours de vidéo
- 💾 Embarquement de la clé (15 bits) dans les LSB du pixel (0,0) de chaque image
- 📺 Répartition : 5 bits par canal (R, G, B)
- ⚙️ Gestion de la robustesse face à la compression vidéo

#### Gestion de la Compression

Plusieurs stratégies pour préserver la clé embarquée malgré la compression :
- Utilisation de codecs sans perte (FFV1)
- Embarquement dans le canal Y (espace YUV)
- Redondance avec vote majoritaire bit par bit

## Interface Utilisateur

L'interface JavaFX permet :
- Affichage simultané de la vidéo source et de la vidéo traitée
- Visualisation en temps réel de la clé de chiffrement utilisée
- Contrôle du processus de chiffrement/déchiffrement
- Monitoring du processus de cassage de clé

## **Apports et Limitations**

### **Apports Techniques**
- **Implémentation complète** d'un système de chiffrement vidéo avec interface graphique interactive
- **Optimisation algorithmique significative** (**réduction de 98,8 %** de l'espace de recherche)
- Exploration de méthodes de [stéganographie](https://fr.wikipedia.org/wiki/St%C3%A9ganographie) et de robustesse face à la compression
- **Analyse comparative** de critères de similarité pour l'[attaque par force brute](https://fr.wikipedia.org/wiki/Attaque_par_force_brute)

### **Limitations**
- **Sécurité** : clé de 15 bits insuffisante pour toute application réelle (**usage strictement pédagogique**)
- **Robustesse** : l'embarquement de clé dans les [LSB](https://fr.wikipedia.org/wiki/Bit_de_poids_faible) reste vulnérable aux [codecs avec pertes](https://fr.wikipedia.org/wiki/Compression_de_donn%C3%A9es_avec_perte) ([H.264](https://fr.wikipedia.org/wiki/H.264), [H.265](https://fr.wikipedia.org/wiki/H.265))
- **Scalabilité** : traitement image par image limitant les performances sur vidéos haute résolution

### **Conclusion**

Ce projet a permis d'**explorer** des concepts classiques de **chiffrement vidéo** tout en développant des **techniques d'optimisation** pour le **cassage de clé**. L'**implémentation** en [Java](https://fr.wikipedia.org/wiki/Java_(langage)) avec [OpenCV](https://opencv.org/) et [JavaFX](https://fr.wikipedia.org/wiki/JavaFX) offre une **plateforme robuste** pour **expérimenter** avec le **traitement vidéo** et **visualiser** en **temps réel** l'**impact** des différentes **approches cryptographiques**.
