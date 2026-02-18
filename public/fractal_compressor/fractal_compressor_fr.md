# The Fractal Compressor

![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Numba](https://img.shields.io/badge/Numba-Optimisé-orange.svg)
![Tkinter](https://img.shields.io/badge/GUI-Tkinter-green.svg)

![Capture d'écran de l'interface](/fractal_compressor/screenshot.png)

**The Fractal Compressor** est une expérimentation avancée sur la compression d'image fractale (PIFS - Partitioned Iterated Function Systems). Ce projet démontre comment remplacer le stockage de pixels par des équations mathématiques auto-référentielles, stockant ainsi la *recette* pour recréer l'image plutôt que l'image elle-même.

## Fonctionnalités Clés

*   **Moteur de Compression Fractale** : Analyse l'image pour trouver des motifs auto-similaires (fractales).
*   **Haute Performance** : Fortement optimisé avec `numba` (@njit) pour compiler les boucles critiques en code machine.
*   **Traitement Parallèle** : Répartit l'analyse de l'image sur plusieurs cœurs CPU pour plus de vitesse.
*   **Format de Fichier Personnalisé (.frac)** : Un conteneur binaire hybride utilisant le "Bit Packing" et la compression LZMA pour une efficacité maximale.
*   **Interface Visuelle** : Une interface graphique moderne (ttkbootstrap) offrant une visualisation en temps réel du processus de compression.

## Architecture Technique

Le projet est structuré en quatre composants principaux isolant la logique mathématique de l'interface utilisateur :

### 1. Moteur de Compression (`src/fractal_compressor.py`)
Le cœur du système. Il gère les tâches lourdes :
- **Classification de Blocs** : Catégorise les blocs d'image pour accélérer la recherche de correspondances.
- **Recherche Vectorisée** : Trouve rapidement le meilleur bloc de domaine pour chaque bloc de plage.
- **Compilation JIT** : Utilise Numba pour atteindre des performances proches du C++ sur les calculs intensifs.

### 2. Gestionnaire de Flux (`src/compression_manager.py`)
Agit comme chef d'orchestre entre l'UI et le Moteur :
- **Pré-traitement** : Convertit les images en YCbCr et gère le sous-échantillonnage de la chrominance (4:2:0).
- **Quantification** : Convertit les coefficients de transformation (flottants) en entiers compacts pour le stockage.

### 3. Gestionnaire de Données (`src/compressed_data.py`)
   - Gère la sérialisation du modèle fractal.
   - Applique une couche finale de compression LZMA au fichier `.frac` pour gagner 20-30% d'espace supplémentaire.

### 4. Interface Graphique (`src/gui.py`)
   - Construite avec `tkinter` et stylisée avec `ttkbootstrap` pour un look moderne.
   - Utilise le threading pour garder l'interface réactive pendant les tâches de compression intensives.

## Stack Technique

*   **Langage** : Python 3.10+
*   **Mathématiques** : NumPy, Numba
*   **GUI** : Tkinter, ttkbootstrap
*   **Traitement d'Image** : Pillow (PIL)

> Ce projet a été créé pour explorer les limites des algorithmes de compression d'image et la beauté des mathématiques fractales.
