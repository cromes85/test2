function detectId(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
  
    // Utilisation de Tesseract.js pour la détection de texte
    Tesseract.recognize(
      data,
      'eng',
      {
        logger: m => console.log(m),
      }
    ).then(({ data: { text } }) => {
      console.log(text);
      document.getElementById('detectedId').textContent = `ID détecté : ${text}`;
    });
  }
  window.detectId = detectId;
  