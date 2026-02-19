# **NodalPy**

![Capture d'écran de l'application](/nodalpy/concept.png)

L'idée de ce projet m'est venue en utilisant **[Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)**, une interface pour la génération d'images/vidéos avec **[Stable Diffusion](https://fr.wikipedia.org/wiki/Stable_Diffusion)**. NodalPy permet, grâce à des **nœuds**, de créer des **workflows modulaires** pour générer des images personnalisées ou traiter des données. D'autres outils, comme **[Unreal Engine](https://www.unrealengine.com/)**, proposent également des langages basés sur des nœuds ([**programmation visuelle**](https://fr.wikipedia.org/wiki/Programmation_visuelle)).

Cette approche est intéressante : elle offre une **vision claire** du programme via de petits blocs qui tirent avantage de la **verticalité** et de l'**horizontalité** de l'écran. Cependant, la plupart des interfaces existantes sont **limitées** et ne permettent pas de créer des **nœuds personnalisés** facilement.

C'est là que **NodalPy** intervient. NodalPy est un outil permettant d'**exécuter du code Python** à partir de **nœuds éditables**. Chaque nœud peut être **personnalisé** avec son propre code, ses **variables d'entrée et de sortie**, ce qui facilite la création et l'organisation de **workflows modulaires**.

## **Technologies utilisées**

Le projet est séparé en deux parties principales :
* Le **backend** en **[Python](https://www.python.org/)** (avec **[FastAPI](https://fastapi.tiangolo.com/)**), qui gère l'**exécution des nœuds** et la logique de l'application.
* Le **frontend** en **[React](https://react.dev/)**, qui fournit une **interface utilisateur interactive** moderne pour créer et gérer les nœuds.

Le projet a été développé pour être flexible : il peut être exécuté comme une application web locale, ou comme une application de bureau grâce à **[PyWebView](https://pywebview.flowrl.com/)**, offrant une expérience native légère.

## **Fonctionnalités actuelles**

Pour l'instant, NodalPy est conçu pour une utilisation **locale**. Il intègre plusieurs types de nœuds pour couvrir différents besoins :

- **FastNodes** : Ces nœuds s'exécutent **automatiquement** et de manière **réactive**. Dès que vous modifiez le code ou une connectique, le résultat est recalculé instantanément (avec un système de "debounce" pour la performance).
- **Custom Nodes** : Pour les tâches plus lourdes ou nécessitant un contrôle précis, ces nœuds ne s'exécutent que lorsque vous le décidez manuellement. Ils sont isolés, garantissant qu'une erreur ne plante pas tout le flux.
- **Value Nodes** : Des blocs prêts à l'emploi pour injecter des données typées (Entiers, Flottants, Textes, Fichiers, etc.).
- **Observer Node** : Un outil puissant pour **visualiser** les résultats en temps réel. Il supporte le texte, les nombres, mais aussi les **images** (générées par **Matplotlib**, **PIL** ou en base64) et le formatage interactif de données (JSON/Tableaux).

## **Fonctionnalités à venir**

Le projet continue d'évoluer avec pour objectif d'ajouter :
- **Bibliothèques externes** : Une gestion simplifiée pour importer et utiliser n'importe quelle librairie Python installée.
- **Support Cloud** : La possibilité d'exécuter des workflows lourds sur un serveur distant.
- **Système de Plugins** : Pour permettre à la communauté de créer et partager ses propres types de nœuds.
