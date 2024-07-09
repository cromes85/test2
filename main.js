document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        console.log('File selected:', file);
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('image');
            img.onload = function() {
                console.log('Image loaded:', img);
                autoCropImage(img, function(croppedImageDataUrl) {
                    console.log('Cropped image data URL:', croppedImageDataUrl);
                    img.src = croppedImageDataUrl;
                    initializeCropper(img);
                });
            };
            img.src = e.target.result;
            img.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}

document.getElementById('cropButton').addEventListener('click', function () {
    const croppedCanvas = getCroppedCanvas();
    console.log('Cropped canvas:', croppedCanvas);
    processImage(croppedCanvas);
});
