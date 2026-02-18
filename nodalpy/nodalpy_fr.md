# NodalPy

![Licence MIT](https://img.shields.io/badge/License-MIT-green.svg)
![Python](https://img.shields.io/badge/Python-3.x-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-20-brightgreen.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.95-teal.svg)

**NodalPy** est un environnement de développement visuel nodal pour l'exécution de code Python en temps réel dans le navigateur. Il combine la flexibilité du script Python avec une interface nodale intuitive pour créer des flux de traitement de données, des prototypes d'algorithmes et des visualisations.

## Fonctionnalités Clés

*   **FastNodes** : Exécution automatique et réactive. Les mises à jour du code ou des entrées déclenchent un recalcul instantané (avec "debounce").
*   **Custom Nodes** : Conçus pour les tâches lourdes ou un contrôle précis. L'exécution est déclenchée manuellement et est isolée des parents en amont.
*   **Value Nodes** : Entrées typées prêtes à l'emploi incluant Entier, Flottant, Booléen, Chaîne de caractères et Fichier (supporte le téléchargement de fichiers et les chemins relatifs).
*   **Observer Node** : Visualisation riche des résultats supportant Texte, Nombres, Images (Matplotlib, PIL, base64), et formatage JSON interactif pour Tableaux/Dictionnaires.
*   **Persistance de Projet** :
    *   Fonctionnalité native de Sauvegarde/Chargement JSON.
    *   Sauvegarde locale automatique via IndexedDB.
    *   Isolation des fichiers basée sur la session.
*   **Sécurité & Stabilité** :
    *   Détection et prévention des boucles infinies.
    *   Délais d'exécution configurables.
    *   Gestion robuste des erreurs WebSocket.

## Structure du Projet

*   `back-api/` : Backend FastAPI. Gère l'exécution du code Python, les WebSockets et les opérations sur le système de fichiers.
*   `front-editor/` : Frontend React. Interface nodale utilisant ReactFlow, l'éditeur CodeMirror et une gestion d'état globale.
*   `build/` : Dossier de distribution généré automatiquement contenant le backend et le frontend compilé.
*   `build.py` : Script d'orchestration pour la construction et le déploiement local.

## Contribution

Les contributions sont les bienvenues.
1.  Forkez le projet.
2.  Créez une branche (`git checkout -b feature/ma-fonctionnalite`).
3.  Commitez vos changements.
4.  Poussez et créez une Pull Request.
