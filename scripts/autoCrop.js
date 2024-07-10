function autoCrop() {
    console.log("Chargement de l'image sur le canvas...");
    const img = document.getElementById('uploadedImage');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    // Charger l'image sur le canvas
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    console.log("Initialisation d'OpenCV...");
    const src = cv.imread(canvas);
    const dst = new cv.Mat();
    const ksize = new cv.Size(9, 9); // Augmentation de la taille du noyau pour un flou plus prononcé
    
    // Appliquer le flou gaussien
    cv.GaussianBlur(src, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
    console.log("Gaussian Blur appliqué.");

    // Convertir en niveaux de gris
    cv.cvtColor(dst, dst, cv.COLOR_RGBA2GRAY, 0);
    console.log("Conversion en niveaux de gris.");

    // Appliquer la détection des bords Canny
    cv.Canny(dst, dst, 75, 200, 3, false); // Ajustement des seuils pour une meilleure détection des bords
    console.log("Canny Edge Detection appliqué.");

    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(dst, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);
    console.log(`Contours trouvés: ${contours.size()}`);

    let maxArea = 0;
    let bestContour = null;
    for (let i = 0; i < contours.size(); ++i) {
        const contour = contours.get(i);
        const area = cv.contourArea(contour);
        if (area > maxArea) {
            maxArea = area;
            bestContour = contour;
        }
    }

    if (bestContour) {
        const rect = cv.boundingRect(bestContour);
        console.log(`Meilleur contour trouvé. Rectangle: ${JSON.stringify(rect)}`);
        const cropped = src.roi(rect);
        
        cv.imshow('imageCanvas', cropped);
        console.log("Recadrage effectué.");

        src.delete();
        dst.delete();
        contours.delete();
        hierarchy.delete();
        cropped.delete();
    } else {
        console.log("Aucun contour pertinent trouvé.");
    }
}
