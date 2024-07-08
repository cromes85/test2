document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.getElementById("preview");
        img.src = e.target.result;
        img.style.display = "block";

        img.onload = function () {
          identifyCard(img);
        };
      };
      reader.readAsDataURL(file);
    }
  });

function onOpenCvReady() {
  console.log("OpenCV is ready");
}

function identifyCard(imgElement) {
  let src = cv.imread(imgElement);
  let gray = new cv.Mat();
  cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

  // Appliquer un filtre Gaussien pour réduire le bruit
  let blurred = new cv.Mat();
  cv.GaussianBlur(gray, blurred, new cv.Size(5, 5), 0);

  // Appliquer la détection de bordures avec Canny
  let edges = new cv.Mat();
  cv.Canny(blurred, edges, 50, 150);

  // Trouver les contours
  let contours = new cv.MatVector();
  let hierarchy = new cv.Mat();
  cv.findContours(
    edges,
    contours,
    hierarchy,
    cv.RETR_CCOMP,
    cv.CHAIN_APPROX_SIMPLE
  );

  // Traiter les contours
  for (let i = 0; i < contours.size(); i++) {
    let cnt = contours.get(i);
    let rect = cv.boundingRect(cnt);
    let roi = gray.roi(rect);

    performOCR(roi);

    roi.delete();
  }

  src.delete();
  gray.delete();
  blurred.delete();
  edges.delete();
  contours.delete();
  hierarchy.delete();
}

function performOCR(roi) {
  let canvas = document.createElement("canvas");
  cv.imshow(canvas, roi);

  Tesseract.recognize(canvas, "eng", {
    logger: (m) => console.log(m),
  }).then(({ data: { text } }) => {
    console.log(`Texte détecté : ${text}`);
    let cardInfo = parseCardInfo(text);
    displayCardInfo(cardInfo);
  });
}

function parseCardInfo(text) {
  // Analyse du texte détecté pour extraire les informations de la carte
  let nameMatch = text.match(/name: (\w+)/i);
  let levelMatch = text.match(/level: (\w+)/i);
  let seriesMatch = text.match(/series: (\w+)/i);
  let idMatch = text.match(/id: (\w+)/i);

  return {
    name: nameMatch ? nameMatch[1] : "Inconnu",
    level: levelMatch ? levelMatch[1] : "Inconnu",
    series: seriesMatch ? seriesMatch[1] : "Inconnu",
    id: idMatch ? idMatch[1] : "Inconnu",
  };
}

function displayCardInfo(cardInfo) {
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
      <h2>Carte Identifiée</h2>
      <p>Nom : ${cardInfo.name}</p>
      <p>Niveau : ${cardInfo.level}</p>
      <p>Série : ${cardInfo.series}</p>
      <p>ID : ${cardInfo.id}</p>
      <p>Prix moyen : 10€</p> <!-- Placeholder pour le prix moyen -->
  `;
}
