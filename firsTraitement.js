function processImage(croppedCanvas) {
  console.log("Processing cropped canvas:", croppedCanvas);
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  const scale = 2; // Augmentez ce facteur pour une résolution plus élevée
  canvas.width = croppedCanvas.width * scale;
  canvas.height = croppedCanvas.height * scale;
  ctx.drawImage(croppedCanvas, 0, 0, canvas.width, canvas.height);

  // Amélioration du contraste
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg > 128 ? 255 : 0;
    data[i + 1] = avg > 128 ? 255 : 0;
    data[i + 2] = avg > 128 ? 255 : 0;
  }
  ctx.putImageData(imageData, 0, 0);

  // Conversion en niveaux de gris
  const grayImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const grayData = grayImageData.data;
  for (let i = 0; i < grayData.length; i += 4) {
    const gray =
      0.299 * grayData[i] + 0.587 * grayData[i + 1] + 0.114 * grayData[i + 2];
    grayData[i] = gray;
    grayData[i + 1] = gray;
    grayData[i + 2] = gray;
  }
  ctx.putImageData(grayImageData, 0, 0);

  console.log("Image processed, ready for ID detection.");
}
