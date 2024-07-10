// autoCrop.js
function autoCrop() {
  const img = document.getElementById("uploadedImage");
  const canvas = document.getElementById("imageCanvas");
  const ctx = canvas.getContext("2d");

  console.log("Chargement de l'image sur le canvas...");
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0, img.width, img.height);

  console.log("Initialisation d'OpenCV...");
  const src = cv.imread(canvas);
  const dst = new cv.Mat();
  const ksize = new cv.Size(3, 3);
  cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  console.log("Gaussian Blur appliqué.");
  cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
  console.log("Conversion en niveaux de gris.");
  cv.Canny(dst, dst, 75, 200, 3, false); // Ajustement des seuils pour une meilleure détection des bords
  console.log("Canny Edge Detection appliqué.");

  const contours = new cv.MatVector();
  const hierarchy = new cv.Mat();
  cv.findContours(
    dst,
    contours,
    hierarchy,
    cv.RETR_EXTERNAL,
    cv.CHAIN_APPROX_SIMPLE
  );
  console.log(`Contours trouvés: ${contours.size()}`);

  // Rechercher le meilleur contour dans la zone cible
  let maxArea = 0;
  let bestContour = null;
  for (let i = 0; i < contours.size(); ++i) {
    const contour = contours.get(i);
    const area = cv.contourArea(contour);
    const rect = cv.boundingRect(contour);
    // Filtrer les contours pour se concentrer sur la zone inférieure droite
    if (rect.y > canvas.height * 0.6 && rect.x > canvas.width * 0.4) {
      if (area > maxArea) {
        maxArea = area;
        bestContour = contour;
      }
    }
  }

  if (bestContour) {
    const rect = cv.boundingRect(bestContour);
    console.log(`Meilleur contour trouvé. Rectangle: ${JSON.stringify(rect)}`);
    cv.rectangle(
      src,
      new cv.Point(rect.x, rect.y),
      new cv.Point(rect.x + rect.width, rect.y + rect.height),
      [255, 0, 0, 255],
      2
    );

    const cropped = src.roi(rect);
    cv.imshow("imageCanvas", cropped);
    console.log("Recadrage effectué.");

    // Créer un ImageData à partir du canvas recadré
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = cropped.cols;
    croppedCanvas.height = cropped.rows;
    const croppedCtx = croppedCanvas.getContext("2d");
    cv.imshow(croppedCanvas, cropped);
    const imageData = croppedCtx.getImageData(0, 0, cropped.cols, cropped.rows);

    // Assigner le canvas recadré pour le traitement de l'image
    window.detectId(imageData);
  } else {
    console.log("Aucun contour approprié trouvé.");
  }

  src.delete();
  dst.delete();
  contours.delete();
  hierarchy.delete();
}

window.autoCrop = autoCrop;
