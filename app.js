document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('preview');
            img.src = e.target.result;
            img.style.display = 'block';

            img.onload = function() {
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
    let thresh = new cv.Mat();
    cv.threshold(gray, thresh, 150, 255, cv.THRESH_BINARY);
    let contours = new cv.MatVector();
    let hierarchy = new cv.Mat();
    cv.findContours(thresh, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

    for (let i = 0; i < contours.size(); i++) {
        let cnt = contours.get(i);
        let rect = cv.boundingRect(cnt);
        let roi = gray.roi(rect);

        performOCR(roi);

        roi.delete();
    }

    src.delete(); gray.delete(); thresh.delete(); contours.delete(); hierarchy.delete();
}

function performOCR(roi) {
    let canvas = document.createElement('canvas');
    cv.imshow(canvas, roi);
    
    Tesseract.recognize(
        canvas,
        'eng',
        {
            logger: (m) => console.log(m),
        }
    ).then(({ data: { text } }) => {
        console.log(`Texte détecté : ${text}`);
        displayCardInfo({ name: text.trim(), level: "Inconnu", series: "Inconnu", id: "Inconnu" });
    });
}

function displayCardInfo(cardInfo) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>Carte Identifiée</h2>
        <p>Nom : ${cardInfo.name}</p>
        <p>Niveau : ${cardInfo.level}</p>
        <p>Série : ${cardInfo.series}</p>
        <p>ID : ${cardInfo.id}</p>
        <p>Prix moyen : 10€</p> <!-- Placeholder pour le prix moyen -->
    `;
}
