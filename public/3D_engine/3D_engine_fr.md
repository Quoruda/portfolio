# 🎮 Moteur 3D en Java

> Un moteur de rendu 3D développé from scratch en Java, sans utiliser de bibliothèques graphiques externes.

---

## 🎯 Le Défi

J'ai toujours été fasciné par la manière dont les jeux vidéo et applications 3D fonctionnent "sous le capot". Plutôt que d'utiliser des frameworks tout faits comme **Unity** ou des bibliothèques comme **OpenGL**, j'ai voulu comprendre réellement comment fonctionne un moteur 3D en l'implémentant intégralement moi-même en Java.

**L'objectif** : partir d'une page blanche et construire un système capable de transformer des modèles 3D en images 2D affichables à l'écran, pixel par pixel.

---

## 🛠️ Le Travail Réalisé

Ce projet m'a demandé de maîtriser et d'implémenter de nombreux concepts mathématiques et algorithmiques :

### 📐 Pipeline de Rendu Complet

- **Transformations 3D** : Implémentation des opérations (translation, rotation, échelle) avec des matrices 4×4
- **Projection perspective** : Matrice de projection configurable (FOV, aspect ratio, near/far planes)
- **Back-face culling** : Algorithme basé sur les normales pour éliminer les faces non visibles
- **Frustum culling** : Clipping des triangles contre les plans de vue avec génération de nouveaux triangles
- **Rasterisation** : Conversion manuelle des triangles avec interpolation des coordonnées de texture
- **Z-buffering** : Gestion correcte de l'ordre de profondeur des objets

### 🔢 Système Mathématique Robuste

- Opérations vectorielles (addition, soustraction, produit scalaire, produit vectoriel)
- Multiplication et inversion de matrices
- Normalisation de vecteurs avec implémentation du célèbre **"fast inverse square root"** de Quake III
- Calcul de matrices de vue (`Matrix_PointAt` et son inverse rapide)

### 🎨 Fonctionnalités Graphiques

- **Chargement de modèles** : Parsing de fichiers `.obj` (vertices, faces, coordonnées de texture)
- **Système de textures** : Échantillonnage UV avec correction de perspective
- **Éclairage directionnel** : Calcul d'intensité basé sur les normales
- **Textures procédurales** : Support de couleurs unies et grilles

### 🏗️ Architecture Logicielle

- **Système de scène** : Hiérarchie d'objets (Scene, Mesh, Camera, Node)
- **Engine loop** : Calcul du `deltaTime` pour des animations indépendantes du framerate
- **Caméra libre** : Contrôles pitch/yaw pour explorer la scène
- **Display abstrait** : Architecture permettant différents modes de rendu
- **Input mapping** : Système flexible pour les contrôles clavier
- **Pattern Observer** : Gestion propre des événements

### ⚡ Optimisations

- Système de flags pour ne recalculer les transformations que lorsque nécessaire
- Utilisation du **fast inverse square root** pour les normalisations fréquentes
- Pré-calcul des normales des triangles

---

## 📚 Ce que j'ai Appris

Ce projet a été une plongée profonde dans les mathématiques appliquées et l'informatique graphique. J'ai dû :

✅ Comprendre réellement l'**algèbre linéaire** et son application pratique  
✅ Gérer les problèmes de **précision flottante** et leurs impacts visuels  
✅ Optimiser pour maintenir des **performances acceptables** malgré les calculs intensifs  
✅ Débugger des problèmes visuels complexes (inversions de normales, clipping incorrect, artefacts de texture)  
✅ Structurer un projet de moyenne envergure avec une **architecture propre et extensible**

---

## 🎬 Exemples d'Utilisation

Le dépôt inclut plusieurs démos démontrant les capacités du moteur :

- 🐵 Affichage de modèles 3D complexes (monkey head, teapot, formes géométriques)
- 🖼️ Application de textures personnalisées
- 🎥 Système de caméra libre pour explorer la scène
- 🌀 Expérience "Portal" avec plusieurs caméras et rendu sur texture

---

## 🚀 Perspectives d'Évolution

Le moteur est fonctionnel mais pourrait être enrichi de nombreuses façons :

| Fonctionnalité | Description |
|----------------|-------------|
| **Collision** | Détection et réponse aux collisions entre objets |
| **Éclairage avancé** | Sources lumineuses multiples, ombres portées, shading de Phong/Blinn-Phong |
| **Console dev** | Interface en temps réel pour ajuster les paramètres et débugger |
| **Optimisations** | Octree/BSP pour le culling spatial, multithreading du rendu |
| **Post-processing** | Bloom, antialiasing, depth of field |
| **Format de scène** | Sérialisation/désérialisation pour sauvegarder et charger des scènes complexes |

---

## 💻 Technologies Utilisées

- **Java** : Langage principal pour sa portabilité et sa robustesse
- **Swing/AWT** : Pour l'affichage et la gestion des inputs
- **Mathématiques pures** : Aucune bibliothèque graphique externe

---

## 🎓 Conclusion

Ce projet représente plusieurs semaines de travail intense et m'a donné une base solide pour comprendre les moteurs modernes comme **Unity**, **Unreal** ou les APIs comme **Vulkan** et **DirectX**.
