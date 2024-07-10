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
    let dst = new cv.Mat();
    
    // Define the rectangle to crop (full width and bottom 10% of the height)
    let rect = new cv.Rect(0, canvas.height * 0.9, canvas.width, canvas.height * 0.1);
    dst = src.roi(rect);

    console.log("Recadrage effectué.");
    cv.imshow('imageCanvas', dst);

    src.delete();
    dst.delete();
}

window.autoCrop = autoCrop;
