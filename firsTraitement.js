function processImage(img) {
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  // Assuming the ID is always in the bottom section of the card, adjust as necessary
  const bottomSectionHeight = img.height * 0.1; // adjust the percentage as needed
  const imageData = ctx.getImageData(
    0,
    img.height - bottomSectionHeight,
    img.width,
    bottomSectionHeight
  );

  detectId(imageData);
}
