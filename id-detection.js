function detectId(imageData) {
  Tesseract.recognize(imageData, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    const idMatch = text.match(/\b\d{1,3}\/\d{1,3}\b/);
    if (idMatch) {
      displayResult(idMatch[0]);
    } else {
      displayResult("ID non trouvé");
    }
  });
}

function displayResult(id) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p>ID détecté : ${id}</p>`;
}
