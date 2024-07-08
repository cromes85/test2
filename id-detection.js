function detectId(canvas) {
  Tesseract.recognize(
    canvas.toDataURL(), // Utilisation de l'URL de données de l'image
    "eng",
    {
      logger: (m) => console.log(m),
    }
  )
    .then(({ data: { text } }) => {
      const idMatch = text.match(/\b\d{1,3}\/\d{1,3}\b/);
      if (idMatch) {
        displayResult(idMatch[0]);
      } else {
        displayResult("ID non trouvé");
      }
    })
    .catch((err) => {
      console.error(err);
      displayResult("Erreur lors de la reconnaissance de l'ID");
    });
}

function displayResult(id) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p>ID détecté : ${id}</p>`;
}
