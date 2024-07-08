function processImage(img) {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // En supposant que l'ID est toujours dans la section inférieure de la carte, ajustez si nécessaire
  const bottomSectionHeight = img.height * 0.1; // ajustez le pourcentage selon les besoins
  const imageData = ctx.getImageData(
    0,
    img.height - bottomSectionHeight,
    img.width,
    bottomSectionHeight
  );

  detectId(imageData);
}
