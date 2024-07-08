function processImage(img) {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Recadrage de la section inférieure de l'image
  const bottomSectionHeight = img.height * 0.2; // Ajustez le pourcentage si nécessaire
  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = img.width;
  croppedCanvas.height = bottomSectionHeight;
  const croppedCtx = croppedCanvas.getContext("2d");
  croppedCtx.drawImage(
    canvas,
    0,
    img.height - bottomSectionHeight,
    img.width,
    bottomSectionHeight,
    0,
    0,
    img.width,
    bottomSectionHeight
  );

  detectId(croppedCanvas);
}
