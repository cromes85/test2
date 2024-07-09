//firsTraitement.js
function processImage(croppedCanvas) {
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
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

  detectId(canvas);
}
window.processImage = processImage;
