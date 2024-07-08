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

  // Appliquer un seuillage simple
  let thresh = new cv.Mat();
  cv.threshold(gray, thresh, 150, 255, cv.THRESH_BINARY);

  performOCR(thresh);

  src.delete();
  gray.delete();
  thresh.delete();
}

function performOCR(imgMat) {
  let canvas = document.createElement("canvas");
  cv.imshow(canvas, imgMat);

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
  let nameMatch = text.match(
    /Venusaur|Bulbasaur|Charmander|Squirtle|Pikachu|Eevee/i
  );
  let levelMatch = text.match(/STAGE \d/i);
  let seriesMatch = text.match(/series: (\w+)/i);
  let idMatch = text.match(/\d+\/\d+/);

  return {
    name: nameMatch ? nameMatch[0] : "Inconnu",
    level: levelMatch ? levelMatch[0] : "Inconnu",
    series: seriesMatch ? seriesMatch[1] : "Inconnu",
    id: idMatch ? idMatch[0] : "Inconnu",
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
