function autoCrop() {
    console.log("Chargement de l'image sur le canvas...");

    // Get the canvas element and its context
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    // Draw the image on the canvas
    const img = document.getElementById('uploadedImage');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    console.log("Initialisation d'OpenCV...");
    // Load the image into an OpenCV Mat
    let src = cv.imread(canvas);
    
    // Define the rectangle to crop (full width and bottom 40 pixels height)
    let rect = new cv.Rect(0, canvas.height - 70, canvas.width, 40);
    let dst = src.roi(rect);

    console.log("Recadrage effectué.");
    cv.imshow('imageCanvas', dst);

    src.delete();
    dst.delete();
}

window.autoCrop = autoCrop;
