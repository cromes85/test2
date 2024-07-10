// id-detection.js
async function detectId(imageData) {
  try {
    const worker = await Tesseract.createWorker({
      logger: (m) => console.log(m),
    });

    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {
      data: { text },
    } = await worker.recognize(imageData);
    console.log(text);
    const match = text.match(/\d{3}\/\d{3}/);
    document.getElementById("detectedId").textContent = `ID détecté : ${
      match ? match[0] : "Aucun ID trouvé"
    }`;

    await worker.terminate();
  } catch (err) {
    console.error("Error during OCR processing: ", err);
  }
}

window.detectId = detectId;
