# **NodalPy**

![Capture d'écran de l'application](/nodalpy/concept.png)

L'idée de ce projet m'est venue en utilisant **[Automatic1111](https://github.com/AUTOMATIC1111/stable-diffusion-webui)**, une interface pour la génération d'images/vidéos avec **[Stable Diffusion](https://fr.wikipedia.org/wiki/Stable_Diffusion)**. NodalPy permet, grâce à des **nœuds**, de créer des **workflows modulaires** pour générer des images personnalisées. D'autres outils, comme **[Unreal Engine](https://www.unrealengine.com/)**, proposent également des langages basés sur des nœuds ([**programmation visuelle**](https://fr.wikipedia.org/wiki/Programmation_visuelle)).

Cette approche est intéressante : elle offre une **vision claire** du programme via de petits blocs qui tirent avantage de la **verticalité** et de l'**horizontalité** de l'écran. Cependant, la plupart des interfaces existantes sont **limitées** et ne permettent pas de créer des **nœuds personnalisés**.

C'est là que **NodalPy** intervient. NodalPy est un outil permettant d'**exécuter du code** à partir de **nœuds éditables**. Chaque nœud peut être **personnalisé** avec son propre code, ses **variables d'entrée et de sortie**, ce qui facilite la création et l'organisation de **workflows modulaires**.

## **Technologies utilisées**

Le projet est séparé en deux parties principales :
* Le **backend** en [Python](https://www.python.org/), qui gère l'**exécution des nœuds** et la logique de l'application.
* Le **frontend** en **JavaScript** ([Vue.js](https://vuejs.org/)), qui fournit une **interface utilisateur interactive** pour créer et gérer les nœuds.

Le projet a été développé pour être exécuté sur un **serveur** et accessible via un **navigateur web**, mais grâce à [Electron](https://www.electronjs.org/), l'application peut aussi fonctionner comme une **application de bureau multiplateforme**.

## **Fonctionnalités actuelles**

Pour l'instant, pour des raisons de **sécurité** et de **budget**, NodalPy est limité à une utilisation **locale** ([**localhost**](https://fr.wikipedia.org/wiki/Localhost)) et ne supporte pas encore les fonctionnalités avancées comme l'**authentification utilisateur** ou le **déploiement sur un serveur distant**.

Il existe actuellement deux types de nœuds :
- **Code** : permet d'écrire du **code Python personnalisé**. Il est possible de connecter les **variables de sortie** d'autres nœuds aux **variables d'entrée** de ce nœud.
- **Observateur** : permet de **visualiser** les valeurs des variables en **temps réel**. Utile pour le **débogage** et la **surveillance** des flux de données.

## **Fonctionnalités à venir**

Les nœuds suivants sont prévus :
- **Fichier** : permet de **lire et d'écrire** des fichiers.
- **Librairie** : permet d'utiliser des **bibliothèques externes**.
- **Fantôme** : permet d'avoir une **copie** d'un nœud Code avec le code **synchronisé** mais des **entrées et sorties différentes**.
