function autoCropImage(img, callback) {
  console.log("Auto-cropping image:", img);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const originalWidth = img.width;
  const originalHeight = img.height;

  console.log("Original dimensions:", originalWidth, originalHeight);

  // Dimensions standard des cartes Pokémon en cm
  const standardWidth = 6.3;
  const standardHeight = 8.8;

  // Déterminer l'échelle
  const scale = Math.min(
    originalWidth / standardWidth,
    originalHeight / standardHeight
  );

  // Calculer les dimensions recadrées
  const cropWidth = standardWidth * scale;
  const cropHeight = standardHeight * scale;

  // Calculer la position de recadrage
  const cropX = (originalWidth - cropWidth) / 2;
  const cropY = (originalHeight - cropHeight) / 2;

  console.log("Crop dimensions:", cropWidth, cropHeight, cropX, cropY);

  // Configurer le canvas
  canvas.width = cropWidth;
  canvas.height = cropHeight;

  // Dessiner l'image recadrée
  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  // Obtenir l'URL de données de l'image recadrée
  const croppedImageDataUrl = canvas.toDataURL();
  callback(croppedImageDataUrl);
}
