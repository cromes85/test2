// main.js

// Quand l'utilisateur sélectionne une image, cette fonction est appelée
document.getElementById('imageInput').addEventListener('change', function (e) {
    const reader = new FileReader(); // Crée un lecteur de fichier
    reader.onload = function (event) {
        const img = document.getElementById('uploadedImage'); // Trouve l'élément image
        img.src = event.target.result; // Définit la source de l'image avec le contenu du fichier
        img.onload = function () {
            console.log('Image loaded.');
        };
    };
    reader.readAsDataURL(e.target.files[0]); // Lit le fichier sélectionné par l'utilisateur
});

// Quand l'utilisateur clique sur le bouton de recadrage automatique, cette fonction est appelée
document.getElementById('autoCropButton').addEventListener('click', function () {
    autoCrop();
});

// Quand l'utilisateur clique sur le bouton de recadrage manuel, cette fonction est appelée
document.getElementById('manualCropButton').addEventListener('click', function () {
    initManualCrop();
});

// Quand l'utilisateur clique sur le bouton de détection de l'ID, cette fonction est appelée
document.getElementById('detectIdButton').addEventListener('click', function () {
    processImage(document.getElementById('imageCanvas')); // Appelle processImage avec le canvas comme argument
});
