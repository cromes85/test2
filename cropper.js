// cropper.js

function initManualCrop() {
    const img = document.getElementById('uploadedImage');
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    
    console.log('Manual cropping initialized.');
}

window.initManualCrop = initManualCrop;
