# 🎮 Moteur 3D en Java

![Capture d'écran du moteur 3D](/3D_engine/screenshot.png)

> Un moteur de rendu 3D développé from scratch en Java, sans utiliser de bibliothèques graphiques externes.

---

## 🎯 Le Défi

J'ai toujours été fasciné par la manière dont les jeux vidéo et applications 3D fonctionnent "sous le capot". Plutôt que d'utiliser des frameworks tout faits comme **[Unity](https://unity.com/)** ou des bibliothèques comme **[OpenGL](https://www.opengl.org/)**, j'ai voulu comprendre réellement comment fonctionne un moteur 3D en l'implémentant intégralement moi-même en **[Java](https://www.java.com/)**.

**L'objectif** : partir d'une page blanche et construire un système capable de transformer des modèles 3D en images 2D affichables à l'écran, pixel par pixel.

---

## 🛠️ Le Travail Réalisé

Ce projet m'a demandé de maîtriser et d'implémenter de nombreux concepts mathématiques et algorithmiques :

### 📐 Pipeline de Rendu Complet

- **Transformations 3D** : Implémentation des opérations (translation, rotation, échelle) avec des [**matrices 4×4**](https://fr.wikipedia.org/wiki/Matrice_de_transformation)
- **[Projection perspective](https://fr.wikipedia.org/wiki/Perspective_(g%C3%A9om%C3%A9trie))** : Matrice de projection configurable ([**FOV**](https://fr.wikipedia.org/wiki/Champ_de_vision), aspect ratio, near/far planes)
- **[Back-face culling](https://en.wikipedia.org/wiki/Back-face_culling)** : Algorithme basé sur les [**normales**](https://fr.wikipedia.org/wiki/Normale_%C3%A0_une_surface) pour éliminer les faces non visibles
- **[Frustum culling](https://en.wikipedia.org/wiki/Viewing_frustum)** : [**Clipping**](https://fr.wikipedia.org/wiki/D%C3%A9coupage_(infographie)) des triangles contre les plans de vue avec génération de nouveaux triangles
- **[Rasterisation](https://fr.wikipedia.org/wiki/Rast%C3%A9risation)** : Conversion manuelle des triangles avec interpolation des [**coordonnées de texture**](https://en.wikipedia.org/wiki/UV_mapping)
- **[Z-buffering](https://fr.wikipedia.org/wiki/Z-buffer)** : Gestion correcte de l'ordre de profondeur des objets

### 🔢 Système Mathématique Robuste

- Opérations [**vectorielles**](https://fr.wikipedia.org/wiki/Vecteur) (addition, soustraction, [**produit scalaire**](https://fr.wikipedia.org/wiki/Produit_scalaire), [**produit vectoriel**](https://fr.wikipedia.org/wiki/Produit_vectoriel))
- Multiplication et inversion de [**matrices**](https://fr.wikipedia.org/wiki/Matrice_(math%C3%A9matiques))
- Normalisation de vecteurs avec implémentation du célèbre **[fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root)** de Quake III
- Calcul de matrices de vue (`Matrix_PointAt` et son inverse rapide)

### 🎨 Fonctionnalités Graphiques

- **Chargement de modèles** : Parsing de fichiers [**`.obj`**](https://fr.wikipedia.org/wiki/Objet_3D_(format_de_fichier)) (vertices, faces, coordonnées de texture)
- **Système de textures** : Échantillonnage [**UV**](https://en.wikipedia.org/wiki/UV_mapping) avec correction de perspective
- **Éclairage directionnel** : Calcul d'intensité basé sur les normales
- **Textures procédurales** : Support de couleurs unies et grilles

### 🏗️ Architecture Logicielle

- **Système de scène** : Hiérarchie d'objets (Scene, [**Mesh**](https://fr.wikipedia.org/wiki/Mod%C3%A8le_polygonal), Camera, Node)
- **Engine loop** : Calcul du `deltaTime` pour des animations indépendantes du [**framerate**](https://fr.wikipedia.org/wiki/Images_par_seconde)
- **Caméra libre** : Contrôles [**pitch/yaw**](https://fr.wikipedia.org/wiki/Lacet,_tangage_et_roulis) pour explorer la scène
- **Display abstrait** : Architecture permettant différents modes de rendu
- **Input mapping** : Système flexible pour les contrôles clavier
- **[Pattern Observer](https://fr.wikipedia.org/wiki/Observateur_(patron_de_conception))** : Gestion propre des événements

### ⚡ Optimisations

- Système de flags pour ne recalculer les transformations que lorsque nécessaire
- Utilisation du **[fast inverse square root](https://en.wikipedia.org/wiki/Fast_inverse_square_root)** pour les normalisations fréquentes
- Pré-calcul des normales des triangles

---

## 📚 Ce que j'ai Appris

Ce projet a été une plongée profonde dans les mathématiques appliquées et l'[**informatique graphique**](https://fr.wikipedia.org/wiki/Image_de_synth%C3%A8se). J'ai dû :

✅ Comprendre réellement l'**[algèbre linéaire](https://fr.wikipedia.org/wiki/Alg%C3%A8bre_lin%C3%A9aire)** et son application pratique  
✅ Gérer les problèmes de **[précision flottante](https://fr.wikipedia.org/wiki/Virgule_flottante)** et leurs impacts visuels  
✅ Optimiser pour maintenir des **performances acceptables** malgré les calculs intensifs  
✅ Débugger des problèmes visuels complexes (inversions de normales, clipping incorrect, artefacts de texture)  
✅ Structurer un projet de moyenne envergure avec une **architecture propre et extensible**


## 🚀 Perspectives d'Évolution

Le moteur est fonctionnel mais pourrait être enrichi de nombreuses façons :

| Fonctionnalité | Description |
|----------------|-------------|
| **[Collision](https://fr.wikipedia.org/wiki/D%C3%A9tection_de_collision)** | Détection et réponse aux collisions entre objets |
| **Éclairage avancé** | Sources lumineuses multiples, [**ombres portées**](https://fr.wikipedia.org/wiki/Ombre_port%C3%A9e), [**shading de Phong/Blinn-Phong**](https://fr.wikipedia.org/wiki/Ombrage_de_Phong) |
| **Console dev** | Interface en temps réel pour ajuster les paramètres et débugger |
| **Optimisations** | [**Octree**](https://fr.wikipedia.org/wiki/Octree)/[**BSP**](https://fr.wikipedia.org/wiki/Arbre_de_partitionnement_de_l%27espace) pour le culling spatial, [**multithreading**](https://fr.wikipedia.org/wiki/Multithreading) du rendu |
| **Post-processing** | [**Bloom**](https://en.wikipedia.org/wiki/Bloom_(shader_effect)), [**antialiasing**](https://fr.wikipedia.org/wiki/Cr%C3%A9nelage#Anti-cr%C3%A9nelage), [**depth of field**](https://fr.wikipedia.org/wiki/Profondeur_de_champ) |
| **Format de scène** | [**Sérialisation/désérialisation**](https://fr.wikipedia.org/wiki/S%C3%A9rialisation) pour sauvegarder et charger des scènes complexes |

---

## 💻 Technologies Utilisées

- **[Java](https://www.java.com/)** : Langage principal pour sa portabilité et sa robustesse
- **[Swing](https://docs.oracle.com/javase/tutorial/uiswing/)/[AWT](https://docs.oracle.com/javase/8/docs/technotes/guides/awt/)** : Pour l'affichage et la gestion des inputs
- **Mathématiques pures** : Aucune bibliothèque graphique externe

---

## 🎓 Conclusion

Ce projet représente plusieurs semaines de travail intense et m'a donné une base solide pour comprendre les moteurs modernes comme **[Unity](https://unity.com/)**, **[Unreal](https://www.unrealengine.com/)** ou les APIs comme **[Vulkan](https://www.vulkan.org/)** et **[DirectX](https://fr.wikipedia.org/wiki/DirectX)**.
