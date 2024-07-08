function detectId(imageData) {
  const worker = Tesseract.createWorker({
    logger: (m) => console.log(m),
  });

  (async () => {
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    await worker.terminate();

    const idMatch = text.match(/\b\d{1,3}\/\d{1,3}\b/);
    if (idMatch) {
      displayResult(idMatch[0]);
    } else {
      displayResult("ID not found");
    }
  })();
}

function displayResult(id) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `<p>Detected ID: ${id}</p>`;
}
