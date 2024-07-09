## README

### Introduction
Ce projet est une application web conçue pour détecter et identifier les cartes Pokémon à partir de photos prises principalement à partir de smartphones. L'application analyse l'image de la carte pour extraire des informations telles que le nom, le niveau, la série, l'ID, et d'autres détails permettant d'identifier la carte. Ensuite, elle fournit une estimation du prix moyen de la carte en se basant sur plusieurs sites.

### Structure des fichiers
Le projet est organisé de manière à séparer les différentes étapes du processus, facilitant ainsi les améliorations futures. Voici une description de chaque fichier :

#### index.html
Ce fichier HTML constitue la base de l'interface utilisateur. Il permet de charger une image et contient des boutons pour les différentes actions (recadrage automatique, recadrage manuel, détection de l'ID).


#### autoCrop.js
Ce script gère le recadrage automatique de l'image pour détecter les bords de la carte Pokémon et la recadrer correctement.


#### cropper.js
Ce script gère l'initialisation et le fonctionnement du recadrage manuel de l'image.



#### firsTraitement.js
Ce script améliore l'image recadrée pour la rendre prête à être analysée et détecter les informations de la carte.


#### id-detection.js
Ce script gère la détection des informations (ID) de la carte à partir de l'image traitée.


#### main.js
Ce script gère l'initialisation et la gestion des événements pour les boutons et l'interaction avec l'utilisateur.



### Utilisation
1. Chargez l'image de la carte Pokémon en utilisant le bouton "Choisir un fichier".
2. Cliquez sur "Recadrage Automatique" pour que l'application détecte et recadre automatiquement la carte.
3. Si nécessaire, utilisez "Initialiser le Recadrage Manuel" pour ajuster manuellement le recadrage.
4. Cliquez sur "Détecter l'ID" pour extraire les informations de la carte et afficher l'ID détecté.

Cette structure permet une gestion claire et modulaire des différentes étapes du processus de détection et d'identification des cartes Pokémon.