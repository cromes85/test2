// idDetection.js

// Fonction pour détecter l'ID de la carte Pokémon
function detectId(canvas) {
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Utiliser Tesseract.js pour la détection de texte
  Tesseract.recognize(
      canvas, // Passer le canvas directement
      'eng',
      {
          logger: m => console.log(m),
      }
  ).then(({ data: { text } }) => {
      console.log(text);
      document.getElementById('detectedId').textContent = `ID détecté : ${text}`;
  });
}

// Rendre la fonction accessible globalement
window.detectId = detectId;
