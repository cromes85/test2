# Détection d'ID de Carte Pokémon

## Objectif

Cette application web permet de prendre une photo d'une carte Pokémon, de rechercher les informations pertinentes (nom, niveau, série, ID, etc.), et de fournir un prix moyen basé sur plusieurs sites.

## Structure des Fichiers

### index.html

Fichier HTML principal qui contient la structure de base de la page web et inclut tous les scripts nécessaires.

### scripts/autoCrop.js

Contient la fonction `autoCrop` pour le recadrage automatique de l'image.

### scripts/cropper.js

Contient la fonction `initManualCrop` pour l'initialisation du recadrage manuel.

### scripts/firstTraitement.js

Contient la fonction `processImage` pour traiter l'image avant la détection d'ID.

### scripts/idDetection.js

Contient la fonction `detectId` pour détecter l'ID de la carte Pokémon en utilisant Tesseract.js.

### scripts/main.js

Script principal qui initialise les événements des boutons et gère le flux global de l'application.

## Comment Utiliser

1. Sélectionnez une image de la carte Pokémon en cliquant sur le bouton "Choisir un fichier".
2. Une fois l'image chargée, vous pouvez cliquer sur "Recadrage Automatique" pour recadrer automatiquement l'image, ou sur "Initialiser le Recadrage Manuel" pour le faire manuellement.
3. Cliquez sur "Détecter l'ID" pour extraire et afficher l'ID de la carte Pokémon.

## Technologies Utilisées

- HTML5
- JavaScript
- Tesseract.js pour la détection de texte
- OpenCV.js pour le traitement d'image

## Notes

Assurez-vous d'avoir une connexion Internet active car Tesseract.js nécessite des ressources en ligne pour fonctionner.
