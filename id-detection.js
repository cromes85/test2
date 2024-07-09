// id-detection.js

function processImage(canvas) {
    // Obtient le contexte de dessin de l'élément canvas
    const ctx = canvas.getContext('2d');
    
    // Amélioration du contraste 
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Parcourt chaque pixel de l'image
    for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3; // Calcul de la moyenne des valeurs RGB
        data[i] = avg > 128 ? 255 : 0; // Remplace la valeur rouge
        data[i + 1] = avg > 128 ? 255 : 0; // Remplace la valeur verte
        data[i + 2] = avg > 128 ? 255 : 0; // Remplace la valeur bleue
    }
    ctx.putImageData(imageData, 0, 0); // Met à jour l'image du canvas avec new values

    // Appelle la fonction pour détecter l'ID 
    detectId(canvas);
}

window.processImage = processImage;
