function detectId() {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg > 128 ? 255 : 0;
    data[i + 1] = avg > 128 ? 255 : 0;
    data[i + 2] = avg > 128 ? 255 : 0;
  }

  ctx.putImageData(imageData, 0, 0);

  Tesseract.recognize(canvas, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    const idMatch = text.match(/\d{3}\/\d{3}/);
    document.getElementById("detectedId").innerText =
      "ID détecté : " + (idMatch ? idMatch[0] : "ID non trouvé");
  });
}
