function processImage(croppedCanvas) {
  const canvas = document.getElementById('imageCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = croppedCanvas.width;
  canvas.height = croppedCanvas.height;
  ctx.drawImage(croppedCanvas, 0, 0);

  detectId(canvas);
}
